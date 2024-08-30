import React from "react";

interface Props {
    title: string
    children?: React.ReactNode
}

export const SidebarMenu =({title, children}: Props) => {
    return(
        <div className="flex gap-1 flex-col ">
            <span className="text-sm font-semibold font-normal text-emerald-500 bg-white border-white rounded-xl border-1 p-0.5 text-center">{title}</span>
            {children}
        </div>
    )
}