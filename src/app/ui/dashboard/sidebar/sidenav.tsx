"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button, Spinner } from "@nextui-org/react";
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
export default function SideBar() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
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
        <div
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
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarMenu title="Main">
              <SidebarItem
                title="Overview"
                icon=""
                isActive={pathname === "/"}
                href=""
              />
              <SidebarItem
                title="Play"
                icon=""
                isActive={pathname === "/"}
                href=""
              />

              <SidebarItem
                title="Tournaments"
                icon=""
                isActive={pathname === "/"}
              />

              <SidebarItem
                title="Leaderboard"
                icon=""
                isActive={pathname === "/"}
                href="/dashboard/leaderboard/"
              />
            </SidebarMenu>

            <SidebarMenu title="Social">
              <SidebarItem
                title="Friends"
                icon={<FriendsIcon/>}
                isActive={pathname === "/"}
              />
              <SidebarItem
                title="Add Friends"
                icon={<AddFriendsIcon/>}
                isActive={pathname === "/"}
              />
              <SidebarItem
                title="Chat"
                icon={<ChatIcon/>}
                isActive={pathname === "/"}
              />
            </SidebarMenu>
            <SidebarMenu title="Hosting">
              <SidebarItem
                title="Host Event"
                icon=""
                isActive={pathname === "/"}
              />
              <SidebarItem
                title="Host Tournament"
                icon=""
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
                text-white border-2 rounded-md p-2 
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
