'use client'
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownItem, Button} from "@nextui-org/react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
    <div >
    <header >
      <nav className="flex flex-row p-4 items-center justify-center mx-auto">
        <div className="">
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
      </nav>
    </header>
    </div>
  );
}
