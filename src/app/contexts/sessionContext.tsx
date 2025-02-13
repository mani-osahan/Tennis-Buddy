"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getSession, getUserById } from "../api/dashboard/session";

interface UserProfile {
  username: string;
  email: string;
  level: number;
  utr_rating: number;
  experience: number;
  play_style: string;
  court_surface: string[];
  availability: string[];
  location: string[];
  wins: number;
  losses: number;
  years_played: number;
  tournament_experience: boolean;
  win_streak: number;
}

interface SessionContextType {
  session: any;
  userProfile: UserProfile | null;
}
export const SessionContext = createContext<SessionContextType>({
  session: null,
  userProfile: null,
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<any>({
    session: null,
    userProfile: null,
  });
  useEffect(() => {
    const loadSessionAndProfile = async () => {
      const sessionData = await getSession();

      if (sessionData?.user?.id) {
        const profile = await getUserById(sessionData.user.id).then(
          (data) => data
        );
        setSession({ session: sessionData, userProfile: profile });
      }
    };
    loadSessionAndProfile();
  }, []);
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
export const useSessionContext = () => useContext(SessionContext);
