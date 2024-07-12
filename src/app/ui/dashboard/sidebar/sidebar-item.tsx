import NextLink from "next/link"
import { Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, dropdown } from "@nextui-org/react"
import React from "react"
import { useSidebarContext } from "../../layout/layout-context"
import clsx from "clsx"

import { title } from "process";
import { List } from "postcss/lib/list"

interface Props {
    title: string;
    icon: React.ReactNode
    isActive: boolean
    href?: string 
}

interface SidebarMenu {
    title: string;
    icon: React.ReactNode
    href?: string
    divider: boolean,
    sidebarList?: List
}

//First String: String 
//Second String: Href
export const PlayList = {
    "Play Anyone": "/",
    "Play with Friends": "/"
}

//Any Active Tournament 
//Host Tournaments
export const TournamentList = { 
    "Active Tournaments": "/",
    "Host Tournaments": "/"
}

//points gained from playing other people 
// points depend on UTR rating of player
//Club standings is based on overall points but per club
//Tournament points gained (Might have prizes feature for it)
export const LeaderboardList = { 
    "Overall Standings":"",
    "Club Standings": "/",
    "Tournament Standings": "/",
}

export const FriendsList = { 
    //I don't think it needs anything
    //But here if I need to make changes or a dropdown
}

let AddFriends = { 
    //Same with AddFriends
    //Similar to FriendsList Situation
}


//What type of event am I hosting
//Hosts can host anywhere they 
let hostEvent = { 
    "Create Event":"/",
    "Create Club Event": "/"
}



function SidebarMenu (sidebarList: Array<string>){
    return(
        <Dropdown>
              <DropdownTrigger>
                </DropdownTrigger>
            <DropdownMenu>
                    {sidebarList.map((list) => (
                        <DropdownItem>{list}</DropdownItem>
                    ) )}
            </DropdownMenu>
        </Dropdown>
    )
}

export const SidebarItem = ({icon, title, isActive, href = ""}: Props ) => {
    const {collapsed, setCollapsed} = useSidebarContext()

    const handleClick = () => {
        if (window.innerWidth < 768){
            setCollapsed()

        }
    }

    return( 
        <NextLink href={href} className="text-default-900 active:bg-none max-w-full">

            <div className={clsx(
                isActive
                ? "bg-primary-100 [&_svg_path]:fill-primary-500" : "hover:bg-green-500",
                "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
            )}
            onClick={handleClick}
            >
                {icon}
                <span className="text-white" onClick={(titleList) => {
                    
                    switch (titleList): 
                        


                    SidebarMenu([title])
                }}>{title}</span>
            </div>

        </NextLink>
    )

}