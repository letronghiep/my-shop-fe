import { HeartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Flex, Input } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

function HomeHeader({ user }) {
  const { Search } = Input;

  const onNavigateFavoritePage = () => {};
  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 40px",
        position: "sticky",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "100",
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        style={{
          maxWidth: "1440px",
          minWidth: "1280px",
          margin: "auto",
          width: "100%",
          padding: "0px 24px",
        }}
      >
        <Link
          to="/"
          onClick={() => {
            window.location.refresh();
          }}
          className="flex items-center gap-x-2"
        >
          <img alt="Logo" src="/logo.svg" width={240} height={120} />
        </Link>
        <Search
          placeholder="Tìm kiếm sản phẩm"
          size="large"
          style={{ width: 600 }}
        />
        <Flex className="flex items-center gap-x-4">
          <div>
            {user ? (
              <Link to="/login">Đăng nhập / Đăng ký</Link>
            ) : (
              <button onClick={() => {}}>Đăng xuat</button>
            )}
          </div>
          <div onClick={onNavigateFavoritePage}>
            <HeartOutlined />
          </div>
          <div>
            <ShoppingOutlined />
          </div>
        </Flex>
      </Flex>
    </Header>
  );
}

export default HomeHeader;
