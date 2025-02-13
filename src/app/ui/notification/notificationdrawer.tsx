import { useState } from "react";
import { Drawer } from "rsuite";
import { NotificationIcon } from "@/app/lib/images/notification_icon";
import "rsuite/dist/rsuite.min.css";
import { Tabs, Tab } from "@nextui-org/react";

const NotificationDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleOpen = (key: any) => {
    setOpen(true);
    setPlacement(key);
  };

  return (
    <div>
      <div style={{ cursor: "pointer" }} onClick={() => handleOpen("right")}>
        <NotificationIcon />
      </div>
    </div>
  );
};

export default NotificationDrawer;
