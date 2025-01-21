import React from "react";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export const SidebarMenu = ({ title, children }: Props) => {
  return (
    <div className="flex flex-col ">
      <span className="text-sm font-medium font-normal text-primary bg-white border-white rounded-md p-1 text-center">
        {title}
      </span>
      {children}
    </div>
  );
};
