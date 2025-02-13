"use client";
import PlayerMatchmaking from "@/app/api/dashboard/matchmaking";
import { useState } from "react";
import { Users, Clock, MapPin } from "lucide-react";

export default function Play() {
  const [isInQueue, setIsInQueue] = useState(false);
  return (
    <div>
      <PlayerMatchmaking />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Match Preferences */}

        {/* Available Players */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">Available Players</h2>
            </div>
            <div className="text-sm text-gray-600">12 players online</div>
          </div>

          <div className="space-y-4">
            {/* Example Player Card */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-600">Rating: 71023</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                Challenge
              </button>
            </div>
            {/* Add more player cards here */}
          </div>
        </div>
      </div>
    </div>
  );
}
