"use client";
import Link from "next/link";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { Button, Avatar, User, Spinner } from "@nextui-org/react";
import { TennisLogo } from "@/app/lib/images/tennis_logo";
import { SidebarContext, useSidebarContext } from "../../layout/layout-context";
import { Sidebar } from "./sidebar.styles";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { Tooltip } from "@nextui-org/react";
import { SettingIcon } from "@/app/lib/images/settings_icon";
import React from "react";

export default function SideBar(isOpen: any, toggleSidebar: any) {
  const router = useRouter();
 
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const handleLogout = () => {
    console.log("Logging Out..")
    logout()
  }
  const [loading, setLoading] = React.useState(false);
  const { collapsed, setCollapsed } = useSidebarContext();
  const pathname = usePathname();
  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed}></div>
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
              <SidebarItem title="Overview" icon="" isActive={pathname === "/"} href="/dashboard/overview" />
              <SidebarItem title="Play" icon="" isActive={pathname === "/"} href="" />

              <SidebarItem title="Tournaments" icon="" isActive={pathname === "/"} />

              <SidebarItem
                title="Leaderboard"
                icon=""
                isActive={pathname === "/"}
                href='/dashboard/leaderboard/'
              />
            </SidebarMenu>
            
            <SidebarMenu title="Social">
              <SidebarItem
                title="Friends"
                icon=""
                isActive={pathname === "/"}
              />
              <SidebarItem
                title="Add Friends"
                icon=""
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
              <Button
                className=" hover:bg-rose-500 hover:text-white"
                onClick={() => {
                  setLoading(true);
                  handleLogout();
                }}
              >
              {loading ? <Spinner /> : 'Sign Out'}
 
              </Button>
            </div>
            {/* <Menu open={true} setOpen={function (open: boolean): void {
              throw new Error("Function not implemented.");
            } }/> */}
            <></>
          </div>
        </div>
      </div>
    </aside>
    // <div className="flex flex-box drop-shadow-md rounded-xl border-black ">
    //   <div className="relative top-0 left-0 h-screen bg-gray-800 text-white p-6 ">
    //     <div className="lg:flex-1 ">
    //       <a className="flex lg:flex-1 " href="">
    //         <TennisLogo/>
    //         <h1 className="flex py-2 px-3 whitespace-nowrap text-md text-white font-medium">
    //           Tennis Buddy
    //         </h1>
    //       </a>
    //     </div>
    //     <div className="relative top-12">
    //       <div className="flex flex-col space-y-12 ">
    //         <div className="flex flex-col space-y-12 ">
    //           <Button className="mb-2 h-12 w-full p-2 bg-white text-black rounded-lg hover:bg-green-400">
    //             Friends
    //           </Button>
    //           <Button className="mb-2 h-12 w-full p-2 bg-white text-black rounded-lg hover:bg-green-400">
    //             Ranked
    //           </Button>
    //           <Button className="mb-2 h-12 w-full p-2 bg-white text-black rounded-lg hover:bg-green-400">
    //             Leaderboard
    //           </Button>
    //           <Button className="mb-2 h-12 w-full p-2 bg-white text-black rounded-lg hover:bg-green-400">
    //             Casual
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="fixed bottom-0">
    //       <Button
    //         onSubmit={logout}
    //         className="mb-2 h-14 w-48 text-center bg-white hover:text-white hover:bg-red-500 "
    //       >
    //         Sign Out
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
}
