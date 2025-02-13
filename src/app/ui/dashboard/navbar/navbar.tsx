"use client";
import { SearchIcon } from "@/app/lib/images/searchIcon";
import {
  Button,
  Input,
  Navbar,
  NavbarContent,
  Dropdown,
  User,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import NotificationDrawer from "../../notification/notificationdrawer";
import { useSessionContext } from "@/app/contexts/sessionContext";
import { useEffect } from "react";
import { Search } from "lucide-react";
interface NavbarWrapperProps {
  className?: string;
  handleOpen: () => void;
}

export const NavbarWrapper = ({ className }: { className?: string }) => {
  const { session, userProfile } = useSessionContext();
  const username = userProfile?.username;
  // console.log(session.userProfile);

  return (
    <nav className={className}>
      <Navbar
        isBordered
        classNames={{
          wrapper: "max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <Button />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <Input
            startContent={<Search />}
            isClearable
            className="w-full"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search..."
          />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <div>
            <NotificationDrawer />
          </div>

          <div
            className="relative items-center w-screen gap-2 max-md:hidden whitespace-none justify-content max-w-fit "
            style={{ cursor: "pointer" }}
          >
            <Dropdown>
              <DropdownTrigger>
                <User
                  isFocusable
                  name={username}
                  description="Tennis Player"
                  avatarProps={{
                    src: "https://i.pravatar.cc",
                  }}
                  className="text-text"
                />
              </DropdownTrigger>

              <DropdownMenu>
                <DropdownItem>XP under profile</DropdownItem>
                <DropdownItem>Player Level under profile</DropdownItem>
                <DropdownItem className="" href="/profile">
                  Show Profile
                </DropdownItem>
                <DropdownItem>Preferences</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem
                  variant="flat"
                  className="text-danger"
                  color="danger"
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </NavbarContent>
      </Navbar>
    </nav>
  );
};
