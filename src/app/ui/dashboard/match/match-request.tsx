"use client";
import { matchRequest } from "@/app/api/dashboard/session";
import { useEffect, useState } from "react";

export default function MatchRequest() {
  const [matchData, setMatchData] = useState<any>(null);
  const awaitMatchData = async (): Promise<void> => {
    await matchRequest().then((data) => {
      setMatchData(data);
    });
  };

  useEffect(() => {
    awaitMatchData();
  }, []);

  console.log("MatchData", matchData);

//   const submitMatch = async () => {
//     const channel = supabase
//     .channel("public-matches")
//     .on(
//       "postgres_changes",
//       {
//         event: "UPDATE"
//       },
//     (payload: any) => {
//       console.log(payload);
//     })
//     .subscribe()
// }


  return (
    <div>
      <div className="relative container m-auto px-6 text-gray-500">
        <div className="m-auto ">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <h1 className="mb-4 text-4xl text-green-500 font-bold">
                <span className="text-black">Matchmaking</span>
              </h1>

              <form action="" className="">
                <label htmlFor="date-preference" className="text-text">
                  When to play:
                </label>
                <input
                  type="date"
                  id="date-preference"
                  className="text-text border border-gray-700 rounded-md p-2 m-2"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 relative container m-auto px-6 text-gray-500">
        <div className="m-auto">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <h1 className="mb-4 text-4xl text-green-500 font-bold">
                <span className="text-black">Match Listing</span>
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-md p-4">
                {matchData &&
                  matchData.map((match: any, index: any) => (
                    <div key={index}>
                      <h2 className="text-2xl font-bold text-text">
                        Player: 1{match.player1_id}
                      </h2>
                      <h2 className="text-2xl font-bold text-text">
                        Player: 2{match.player2_id}
                      </h2>
                      <p className="text-subtext">
                        Date: {match.scheduled_date}
                      </p>
                      <p className="text-subtext">Time: {match.score}</p>
                      <p className="text-subtext">Status: {match.status}</p>
                      <p className="text-subtext">Location: {match.location}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
