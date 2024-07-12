'use client'
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownItem, Button, Navbar, NavbarBrand} from "@nextui-org/react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {TennisLogo} from '@/app/lib/images/tennis_logo'
export default function DashboardNavbar() {

  const router = useRouter()

  const notifications = [
    {
      key: "View",
      label: "View Profile",
    },
  ];
  const logout = async () => {
    try{
      await axios.get('/api/users/logout')
      router.push('/')
    }catch(error: any){
      console.log(error.message)
    }
  }
  return (
      <Navbar className="bg-blue-400 p-4">
        <NavbarBrand>
        <TennisLogo/>
        </NavbarBrand>
        <div >
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Notifications</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" items={notifications}>
              <DropdownItem key="notifications" color="success">Notifications</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div
          className=""
        >
          <form className="justify-end">
          <Button onClick={logout} color="danger" className=" justify-end items-center hover:text-blac hover:danger">
            <div className="md:block">Sign Out</div>
          </Button>
          </form>
        </div>
      </Navbar>
  );
}
