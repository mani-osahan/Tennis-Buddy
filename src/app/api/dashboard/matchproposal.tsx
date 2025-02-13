import { supabase } from "@/app/lib/supabase/client";
import { useSessionContext } from "@/app/contexts/sessionContext";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserCheck, X } from "lucide-react";

interface Proposal {
  id: string;
  requester_id: string;
  receiver_id: string;
  skill_difference: number;
  status: string;
  expires_at: string;
  requester_accepted: boolean;
  receiver_accepted: boolean;
}

interface MatchProposal {
  onQueueExit: () => void;
}

const Timer = ({
  expiresAt,
  onExpire,
}: {
  expiresAt: string;
  onExpire: () => void;
}) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = new Date(expiresAt).getTime() - Date.now();
      if (remaining <= 0) {
        onExpire();
        clearInterval(interval);
      } else {
        setTimeLeft(`${Math.ceil(remaining / 1000)}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  return <span>Expires in: {timeLeft}</span>;
};

const MatchProposal = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const { session } = useSessionContext();
  const [matchedPlayers, setMatchedPlayers] = useState(false);
  useEffect(() => {
    const fetchProposals = async () => {
      const { data } = await supabase
        .from("match_proposals")
        .select("*")
        .or(
          `receiver_id.eq.${session?.user?.id},requester_id.eq.${session?.user?.id}`
        )
        .eq("status", "pending");

      setProposals(data as Proposal[]);
    };

    const checkProposals = async () => {
      const { data: proposal } = await supabase
        .from("match_proposals")
        .select("*")
        .or(
          `receiver_id.eq.${session?.user?.id},requester_id.eq.${session?.user?.id}`
        )
        .eq("status", "pending");
      setMatchedPlayers(true);
      setProposals(proposal as Proposal[]);
    };

    const channel = supabase
      .channel("match-proposals")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "match_proposals",
          filter: `or(receiver_id.eq.${session?.user?.id},requester_id.eq.${session?.user?.id})`,
        },
        (payload) => {
          setProposals((prev) => [...prev, payload.new as Proposal]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      fetchProposals();
      checkProposals();
    };
  }, [session?.user?.id, proposals]);

  const handleDecline = async (proposalId: string) => {
    const { error } = await supabase
      .from("match_proposals")
      .update({ status: "declined" })
      .eq("id", proposalId);

    await supabase
      .from("match_queue")
      .delete()
      .eq("player_id", session?.user.id);

    if (!error) {
      setProposals((prev) => prev.filter((p) => p.id !== proposalId));
      // onQueueExit();
    }
  };

  const handleMatchAccepted = async (proposalId: string) => {
    const requester = proposals.find((p) => p.id === proposalId)
      ?.requester_id as string;

    const receiver = proposals.find((p) => p.id === proposalId)
      ?.receiver_id as string;

    if (session?.user.id === requester) {
      await supabase
        .from("match_proposals")
        .update({ requester_accepted: true })
        .eq("requester_id", requester);
    } else if (session?.user.id === receiver) {
      await supabase
        .from("match_proposals")
        .update({ receiver_accepted: true })
        .eq("receiver_id", receiver);
    }

    const { data: proposal, error } = await supabase
      .from("match_proposals")
      .select("*")
      .eq("id", proposalId)
      .single();

    if (proposal?.requester_accepted && proposal.receiver_accepted) {
      await supabase.from("match_queue").delete().eq("player_id", requester);

      await supabase.from("match_queue").delete().eq("player_id", receiver);

      await supabase
        .from("match_proposals")
        .update({ status: "matched" })
        .eq("id", proposalId);

      setProposals((prev) => prev.filter((p) => p.id !== proposalId));
      // onQueueExit();
    }
  };

  if (proposals.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-4 z-50">
      {proposals.map((proposal) => (
        <div
          key={proposal.id}
          className="bg-white rounded-lg shadow-lg p-4 w-96 border-l-4 border-primary animate-slide-in"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg">Match Found!</h3>
              <p className="text-sm text-gray-600">
                A player matching your skill level is ready
              </p>
            </div>
            <button
              onClick={() => handleDecline(proposal.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Match Details */}
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Rating Difference</p>
                <p className="text-lg font-semibold text-primary">
                  {proposal.skill_difference}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Status</p>
                <div className="flex items-center gap-1 text-green-600">
                  <UserCheck className="w-4 h-4" />
                  <span className="text-sm">Ready to play</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="mb-3">
            <Timer
              expiresAt={proposal.expires_at}
              onExpire={() => handleDecline(proposal.id)}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => handleMatchAccepted(proposal.id)}
              className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Accept Match
            </button>
            <button
              onClick={() => handleDecline(proposal.id)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchProposal;
