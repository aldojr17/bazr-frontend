import { BoxProps } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

export interface ISidebarMenu {
  name: string;
  icon: IconType;
  path: string;
}

export interface ISidebarProps extends BoxProps {
  menus: ISidebarMenu[];
}

export interface ISidebarItemProps {
  icon: IconType;
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}
