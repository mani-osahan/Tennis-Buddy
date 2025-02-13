"use client";
import {
  SessionContext,
  SessionProvider,
  useSessionContext,
} from "@/app/contexts/sessionContext";
import { supabase } from "@/app/lib/supabase/client";
import { useEffect, useState } from "react";
import { insertMatchQueue } from "./session";
import MatchProposal from "./matchproposal";
import { Clock, MapPin, Users } from "lucide-react";

interface PlayerStats {
  utr_rating: number;
  wins: number;
  losses: number;
  location: string[];
  level: number;
  availability: string[];
  court_surface: string[];
  match_history: [];
  years_played: number;
  tournament_experience: boolean;
  win_streak: number;
  matches_played: number;
}
interface MatchProposalProps {
  proposal: {
    id: string;
    requester: {
      id: string;
      rating: number;
      name: string;
    };
    expiresAt: string;
  };
  onAccept: () => void;
  onDecline: () => void;
}

export interface MatchQueue {
  id?: string;
  player_id: string;
  skill_rating: number;
  status: string;
  preferred_court_surface: string[];
  preferred_location: string[];
  available_until: string;
}
export default function PlayerMatchmaking() {
  const { session, userProfile } = useSessionContext();
  const [playerData, setPlayerData] = useState(0);
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [isInQueue, setIsInQueue] = useState(false);
  const [showMatchingProposal, setShowMatchingProposal] = useState(false);

  useEffect(() => {
    if (userProfile) {
      const stats: PlayerStats = {
        utr_rating: userProfile.utr_rating || 0,
        years_played: userProfile.years_played || 0,
        tournament_experience: userProfile.tournament_experience || false,
        wins: userProfile.wins || 0,
        losses: userProfile.losses || 0,
        court_surface: userProfile.court_surface || [],
        level: userProfile.level || 0,
        win_streak: userProfile.win_streak || 0,
        matches_played: userProfile.wins + userProfile.losses || 0,
        location: userProfile.location || [],
        availability: userProfile.availability || [],
        match_history: [],
      };
      if (isInQueue) {
        setShowMatchingProposal(true);
      }
      const checkQueue = async (session: any) => {
        const { data } = await supabase
          .from("match_queue")
          .select("*")
          .eq("player_id", session?.user.id)
          .eq("status", "searching");

        if (data?.length) {
          setIsInQueue(true);
          setShowMatchingProposal(true);
        }
      };

      checkQueue(session);
      setPlayerStats(stats);
      const rating = calculatePlayerRating(stats);
      setPlayerData(rating);
    }
  }, [userProfile, isInQueue]);

const stopwatch = () => {

}

  const calculateBaseRating = (player: PlayerStats) => {
    let rating = player.utr_rating === 0 ? 100 : player.utr_rating * 100;
    rating += player.years_played * 10;
    rating += player.level * 10;
    if (player.tournament_experience == true) {
      rating += 25;
    }

    return rating;
  };

  const calculateWinStreak = (winStreak: number) => {
    switch (winStreak) {
      case 0:
        return 0;
      case 3:
        return 5;
      case 5:
        return 10;
      case 10:
        return 15;
      default:
        return 0;
    }
  };

  const calculatePlayerRating = (player: PlayerStats) => {
    const baseRating = calculateBaseRating(player);

    let winRate = 50;
    if (player.matches_played > 0) {
      winRate = (player.wins / (player.wins + player.losses)) * 100;
    }

    const ratingRange = Math.max(100, 200 - player.matches_played * 2);

    const streakBonus = calculateWinStreak(player.win_streak);

    return Math.round(baseRating + ratingRange + winRate + streakBonus);
  };

  useEffect(() => {
    const enterQueueChannel = supabase
      .channel("public-matches")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "match_queue",
        },
        (payload) => {
          console.log("Match Queue", payload);
        }
      )
      .subscribe();

    const matchProposals = supabase
      .channel("public-matches")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "match_proposals",
          filter: `receiver_id=eq.${session?.user.id}, requester_id=eq.${session?.user.id}`,
        },
        (payload) => {
          console.log("Match Proposals", payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(enterQueueChannel);
      supabase.removeChannel(matchProposals);
    };
  }, [playerData]);

  if (!playerStats) {
    return <div>Loading...</div>;
  }

  const enterQueue = async () => {
    if (!session?.user?.id) {
      return;
    }
    try {
      const matchQueue: MatchQueue = {
        id: session.user.id,
        player_id: session?.user.id,
        skill_rating: playerData,
        status: "searching",
        preferred_court_surface: playerStats.court_surface || [],
        preferred_location: playerStats?.location || [],
        available_until: new Date(Date.now() + 15 * 60000).toISOString(),
      };

      const { error } = await supabase.from("match_queue").insert(matchQueue);

      if (error) throw error;
      else setIsInQueue(true);

      checkForMatches();
    } catch (error) {
      console.error("error in entering queue", error);
    }
  };

  const exitQueue = async () => {
    if (!session?.user?.id) return;

    try {
      setIsInQueue(false);

      await supabase
        .from("match_queue")
        .delete()
        .eq("player_id", session?.user.id);
    } catch (error) {
      console.error("Error in exiting queue", error);
    }
  };

  const checkForMatches = async () => {
    const skill_range = 100;

    const { data: matches } = await supabase
      .from("match_queue")
      .select("*")
      .neq("player_id", session?.user.id)
      .gte("skill_rating", playerData - skill_range)
      .lte("skill_rating", playerData + skill_range)
      .eq("status", "searching");

    if (matches?.length) {
      setShowMatchingProposal(true);
      handleMatchFound(matches[0]);
    }
  };

  const handleMatchFound = async (match: any) => {
    await supabase.from("match_proposals").insert({
      requester_id: session?.user.id,
      receiver_id: match.player_id,
      skill_difference: Math.abs(playerData - match.skill_rating),
      status: "pending",
      expires_at: new Date(Date.now() + 15 * 60000).toISOString(),
    });

    await supabase
      .from("match_queue")
      .update({ status: "pending" })
      .eq("player_id", session?.user.id);

    await supabase
      .from("match_queue")
      .update({ status: "pending" })
      .eq("player_id", match.player_id);

    setShowMatchingProposal(true);
  };

  return (
    <div>
      <MatchProposal />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Play</h1>
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-gray-600">Player Skill Rating</p>
            <p className="text-2xl font-bold">{playerData}</p>
          </div>
          <button
            onClick={isInQueue ? exitQueue : enterQueue}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isInQueue
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isInQueue ? "Leave Queue" : "Enter Queue"}
          </button>
        </div>
      </div>
      {/* Queue Status - Show when in queue */}
      {isInQueue && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Searching for Match</h3>
                <p className="text-sm text-gray-600">Time in queue: </p>
              </div>
            </div>
            <div className="animate-pulse px-4 py-2 bg-green-50 rounded-full text-green-600 text-sm">
              Looking for players...
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Match Preferences</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Skill Range
              </label>
              <select className="w-full p-2 border rounded-lg">
                <option>±100 Rating (Recommended)</option>
                <option>±200 Rating</option>
                <option>Any Rating</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Game Type
              </label>
              <select className="w-full p-2 border rounded-lg">
                <option>Singles</option>
                <option>Doubles</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Location Preferences</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Preferred Courts
              </label>
              <select className="w-full p-2 border rounded-lg">
                <option>All Nearby Courts</option>
                <option>Barrhaven Courts</option>
                <option>City Center Courts</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Distance
              </label>
              <select className="w-full p-2 border rounded-lg">
                <option>Within 5km</option>
                <option>Within 10km</option>
                <option>Within 20km</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
