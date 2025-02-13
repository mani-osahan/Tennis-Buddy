import { supabase } from "@/app/lib/supabase/client";
interface MatchQueue {
  id?: string;
  player_id: string;
  skill_rating: number;
  status: string;
  preferred_court_surface: string[];
  preferred_location: string[];
  available_until: string;
}

export const getSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

export const getUserById = async (userId: string) => {
  const { data } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", userId)
    .single();
  return data;
};

export const insertProfile = async (profile: any) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  profile.user_id = session?.user.id;
  const profileData = {
    ...profile,
    user_id: session?.user.id,
  };
  const { data } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("user_id", profileData.user_id);
  return data;
};

export const insertMatchQueue = async (matchQueue: any) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user.id) return null;

  const match_queue: MatchQueue = {
    id: session.user.id,
    player_id: session?.user.id,
    skill_rating: matchQueue.skill_rating,
    status: "searching",
    preferred_court_surface: matchQueue.preferred_court_surface,
    preferred_location: matchQueue.preferred_location,
    available_until: new Date(Date.now() + 15 * 60000).toISOString(),
  };

  const { data, error } = await supabase
    .from("match_queue")
    .insert(match_queue);

  return data;
};
