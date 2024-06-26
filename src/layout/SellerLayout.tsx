import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar/Sidebar";
import { ILayoutProps } from "../interfaces/Layout";
import SellerNavbar from "../components/Navbar/SellerNavbar";
import { ISidebarMenu } from "../interfaces/Sidebar";

import { IoTicket, IoPricetag } from "react-icons/io5";
import { HiCollection, HiClipboardList } from "react-icons/hi";
import { MdHome, MdOutlineLocalShipping, MdPayments } from "react-icons/md";
import useUser from "../hooks/useUser";
import { useEffect } from "react";

const SellerLayout = (props: ILayoutProps) => {
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
          <SellerNavbar onOpen={sidebar.onOpen} />

          <Box as="main" p="5">
            {props.children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SellerLayout;
