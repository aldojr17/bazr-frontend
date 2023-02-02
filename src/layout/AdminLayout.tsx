import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { HiClipboardList, HiCollection } from "react-icons/hi";
import { IoPricetag, IoTicket } from "react-icons/io5";
import { MdHome, MdOutlineLocalShipping, MdPayments } from "react-icons/md";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import useUser from "../hooks/useUser";
import { ILayoutProps } from "../interfaces/Layout";
import { ISidebarMenu } from "../interfaces/Sidebar";

const AdminLayout = (props: ILayoutProps) => {
  const sidebar = useDisclosure();
  const sidebarMenus: Array<ISidebarMenu> = [
    { name: "Home", icon: MdHome, path: "/seller/home" },
    { name: "Product", icon: HiCollection, path: "/seller/product" },
    { name: "Voucher", icon: IoTicket, path: "/seller/voucher" },
    { name: "Promotion", icon: IoPricetag, path: "/seller/promotion" },
    { name: "Finance", icon: MdPayments, path: "/seller/finance" },
    { name: "Order", icon: HiClipboardList, path: "/seller/order" },
    {
      name: "Shipment",
      icon: MdOutlineLocalShipping,
      path: "/seller/shipment",
    },
  ];
  const { fetchProfile } = useUser();

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Box as="section" bg="gray.100" minH="100vh">
        <Sidebar display={{ base: "none", md: "unset" }} menus={sidebarMenus} />
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent>
            <Sidebar w="full" borderRight="none" menus={sidebarMenus} />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
          <AdminNavbar onOpen={sidebar.onOpen} />

          <Box as="main" p="5">
            {props.children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;
