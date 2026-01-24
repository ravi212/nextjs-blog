"use client";
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import SideBar from "@/components/atoms/admin/layout/Sidebar";
import Navbar from "@/components/atoms/admin/layout/Navbar";
import SideDrawer from "@/components/atoms/admin/layout/Drawer";
import { ScreenSizes } from "@/enum/enum";
import ListIcon from "@mui/icons-material/List";
import Footer from "./Footer";

const { Content } = Layout;
type Props = {
  children?: React.ReactNode;
};

const AdLayout: React.FC<Props> = ({ children }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [breakPoint, setBreakPoint] = useState(ScreenSizes.MEDIUM);

  useEffect(() => {
    window.addEventListener("resize", () => setBreakPoint(window.innerWidth));
  }, []);

  return (
    <Layout
      style={{ minHeight: "100vh" }}
      className="flex flex-col md:flex-row"
    >
      <div className="md:flex hidden">
        <SideBar collapsed={isCollapsed} />
      </div>

      <Layout className="flex-1">
        <Navbar>
          {/* toggle Sider */}
          {breakPoint >= ScreenSizes.MEDIUM && (
            <ListIcon
              className="md:flex hidden cursor-pointer text-lg pt-1 w-7 h-7"
              onClick={() => setIsCollapsed(!isCollapsed)}
            />
          )}
          {/* toggle drawer */}
          {breakPoint < ScreenSizes.MEDIUM && (
            <ListIcon
              className="md:hidden flex cursor-pointer text-lg pt-1 w-7 h-7"
              onClick={() => setIsOpenDrawer(!isOpenDrawer)}
            />
          )}
        </Navbar>
        <Content style={{ margin: "0 16px", padding: "30px 10px" }}>
          {children}
        </Content>
        <Footer />
      </Layout>

      <SideDrawer
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
      />
    </Layout>
  );
};

export default AdLayout;
