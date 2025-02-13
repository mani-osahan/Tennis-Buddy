"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button, Spinner, user } from "@nextui-org/react";
import { TennisLogo } from "@/app/lib/images/tennis_logo";
import { useSidebarContext } from "../../layout/layout-context";
import { Sidebar } from "./sidebar.styles";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { Tooltip } from "@nextui-org/react";
import { SettingIcon } from "@/app/lib/images/settings_icon";
import { supabase } from "@/app/lib/supabase/client";
import FriendsIcon from "@/app/lib/images/friendsIcon";
import AddFriendsIcon from "@/app/lib/images/addFriendsIcon";
import ChatIcon from "@/app/lib/images/chatIcon";
import PlayIcon from "@/app/lib/images/playIcon";
import TournamentIcon from "@/app/lib/images/tournamentIcon";
import LeaderboardIcon from "@/app/lib/images/leaderboardIcon";
import HostEventIcon from "@/app/lib/images/hostEventIcon";
import OverviewIcon from "@/app/lib/images/overviewIcon";
import HostTournamentIcon from "@/app/lib/images/hostTournamentIcon";
import { useSessionContext } from "@/app/contexts/sessionContext";
export default function SideBar() {
  const router = useRouter();
  const { userProfile } = useSessionContext();
  const logout = async () => {
    await supabase.auth.signOut();
    await router.push("/login");
  };

  const [loading, setLoading] = React.useState(false);
  const { collapsed, setCollapsed } = useSidebarContext();
  const pathname = usePathname();

  return (
    <aside className="h-screen z-[40] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed}></div>
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        {/* <div
          className={Sidebar.Header()}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="relative">
            <TennisLogo />
          </div>
          <h3 className="relative whitespace-normal text-md text-white text-nowrap font-thin">
            Tennis Buddy
          </h3>
        </div> */}
        <div className="px-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc"
              alt="Profile"
              className="h-10 w-10 rounded-full border border-white/20"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-white text-sm font-medium truncate">
                {userProfile?.username}
              </h2>
              <p className="text-white/60 text-xs">Tennis Player</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mx-auto mt-2 pb-2">
            <div className="text-center py-2 rounded-lg bg-white/5">
              <p className="text-white/60 text-xs">UTR</p>
              <div className="flex items-center justify-center">
                <p className="text-white text-sm font-normal">
                  {userProfile?.utr_rating}
                </p>
              </div>
            </div>
            <div className="text-center py-2 rounded-lg bg-white/5">
              <p className="text-white/60 text-xs">Level</p>
              <div className="flex items-center justify-center">
                <p className="text-white text-sm font-normal">
                  {userProfile?.level}
                </p>
                {/* <Activity className="w-3 h-3 text-green-400 ml-1" /> */}
              </div>
            </div>
            <div className="text-center py-2 rounded-lg bg-white/5">
              <p className="text-white/60 text-xs">W/L</p>
              <div className="flex items-center justify-center">
                <p className="text-white text-sm font-normal">
                  {userProfile?.wins}/{userProfile?.losses}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarMenu title="Main">
              <SidebarItem
                title="Overview"
                icon={<OverviewIcon />}
                isActive={pathname === "/"}
                href="/dashboard/"
              />
              <SidebarItem
                title="Play"
                icon={<PlayIcon />}
                isActive={pathname === "/"}
                href="/dashboard/play"
              />

              <SidebarItem
                title="Tournaments"
                icon={<TournamentIcon />}
                isActive={pathname === "/"}
              />

              <SidebarItem
                title="Leaderboard"
                icon={<LeaderboardIcon />}
                isActive={pathname === "/"}
                href="/dashboard/leaderboard/"
              />
            </SidebarMenu>

            <SidebarMenu title="Social">
              <SidebarItem
                title="Friends"
                icon={<FriendsIcon />}
                isActive={pathname === "/"}
              />
              <SidebarItem
                title="Add Friends"
                icon={<AddFriendsIcon />}
                isActive={pathname === "/"}
              />
              <SidebarItem
                title="Chat"
                icon={<ChatIcon />}
                isActive={pathname === "/"}
              />
            </SidebarMenu>
            <SidebarMenu title="Hosting">
              <SidebarItem
                title="Host Event"
                icon={<HostEventIcon />}
                isActive={pathname === "/"}
              />
              <SidebarItem
                title="Host Tournament"
                icon={<HostTournamentIcon />}
                isActive={pathname === "/"}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingIcon />
              </div>
            </Tooltip>
            <div className="max-w-fit">
              <button
                className=" hover:bg-rose-500 
                hover:text-white hover:border-rose-500
                text-white border-2 rounded-xl p-1 
                transition duration-200 ease-in-out"
                onClick={() => {
                  setLoading(true);
                  logout();
                }}
              >
                {loading ? <Spinner /> : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>  
  );
}
