import {
  CloseOutlined,
  ContainerOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Col, Drawer, Menu, Space, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useResponsive from "~/hooks/useResponsive";

const items = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: <Link to="/seller">Trang chủ</Link>,
    title: "/seller",
  },
  {
    key: "2",
    icon: <ContainerOutlined />,
    label: `Quản lý đơn hàng`,
    children: [
      {
        key: "3",
        label: <Link to="/seller/orders/list">Danh sách đơn hàng</Link>,
        title: "/seller/orders/list",
      },
      // {
      //   key: "4",
      //   label: <Link to="/seller/bulk_delivery">Giao hàng loạt</Link>,
      //   title: "/seller/bulk_delivery",
      // },
      // {
      //   key: "5",
      //   label: "Đơn hủy",
      // },
      // {
      //   key: "6",
      //   label: "Trả hàng/Hoàn tiền",
      // },
    ],
  },
  {
    key: "7",
    icon: <ContainerOutlined />,
    label: `Quản lý sản phẩm`,
    children: [
      {
        key: "8",
        label: <Link to="/seller/products/list">Danh sách sản phẩm</Link>,
        title: "/seller/products/list",
      },
      {
        key: "9",
        label: <Link to="/seller/products/create">Thêm sản phẩm</Link>,
        title: "/seller/products/create",
      },
      // {
      //   key: "4",
      //   label: <Link to="/seller/bulk_delivery">Giao hàng loạt</Link>,
      //   title: "/seller/bulk_delivery",
      // },
      // {
      //   key: "5",
      //   label: "Đơn hủy",
      // },
      // {
      //   key: "6",
      //   label: "Trả hàng/Hoàn tiền",
      // },
    ],
  },
];
const Sidebar = () => {
  const { isMobile } = useResponsive();
  const [selectedKey, setSelectedKey] = useState("1");
  const windowPathname = window.location.pathname;

  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken();
  const [open, setOpen] = useState(false);

  const onClick = (e) => {
    // setSelectedKey(e.key);
  };
  useEffect(() => {
    const allData = items.flatMap((item) => {
      if (item && "children" in item && Array.isArray(item.children)) {
        return [item, ...item.children];
      }
      return [item];
    });
    const index = allData.findIndex((item) => {
      if (item && "title" in item && item.title) {
        return windowPathname === item.title;
      } else if (windowPathname === "/seller" && item.title === "/seller") {
        return true;
      }
      return false;
    });
    if (index > -1 && allData[index]) {
      setSelectedKey(allData[index].key);
    }
  }, [windowPathname]);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  if (isMobile) {
    return (
      <>
        <Col
          onClick={showDrawer}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            top: 0,
            height: "100%",
            backgroundColor: colorBgContainer,
            zIndex: 100,
            padding: "4px",
          }}
          className="block md:hidden fixed bottom-0 z-50 left-0 translate-x-7 -translate-y-7 py-2 px-2 shadow-sm shadow-blue-500"
        >
          <MenuOutlined style={{ fontSize: 20, color: "blue" }} />
        </Col>
        <Drawer
          title="Sidebar"
          placement="left"
          closable={false}
          onClose={onClose}
          open={open}
          width={280}
        >
          <Space
            onClick={onClose}
            className="absolute top-0 right-0 -translate-x-5 translate-y-4"
          >
            <CloseOutlined style={{ fontSize: 20 }} />
          </Space>
          <Menu
            onClick={onClick}
            selectedKeys={[selectedKey]}
            mode="inline"
            items={items}
          />
        </Drawer>
      </>
    );
  }

  return (
    <Sider
      style={{
        background: colorBgContainer,
        color: colorText,
      }}
      className="site-layout-background"
      width={240}
    >
      <Menu
        onClick={onClick}
        selectedKeys={[selectedKey]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
