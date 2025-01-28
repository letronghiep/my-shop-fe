import { Layout, theme } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShopHeader } from "~/components/header";
import Sidebar from "~/components/seller/Sidebar";
import SpinLoading from "../components/loading/SpinLoading";
import { getAuth } from "../stores/slices/authSlice";
import { useNavigate } from "react-router-dom";

function ShopLayout({ children }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStorage = useSelector((state) => state.user);

  const userId = userStorage._id;
  useEffect(() => {
    const token = localStorage.getItem("token");
    const client_id = localStorage.getItem("client_id");
    async function getUserData() {
      if (!userId && token && client_id) {
        const data = await dispatch(getAuth()).unwrap();
        if (data) {
          setUser(data.user);
        }
      } else if (!token && !client_id) {
        const path = window.location.pathname;
        if (!["/login", "/register"].includes(path)) {
          navigate("/login", { replace: true });
        }
      }
    }
    getUserData();
  }, [dispatch, navigate, userId]);
  const { Content } = Layout;
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  // console.log("user", user);
  if (!user) return <SpinLoading />;
  return (
    <Layout>
      <ShopHeader user={user} />
      <Content
        style={{
          maxWidth: "1500px",
          margin: "auto",
          width: "100%",
        }}
      >
        <Layout
          style={{
            margin: "20px 0",
            borderRadius: borderRadiusLG,
            display: "flex",
            columnGap: "20px",
          }}
        >
          <Sidebar />
          <Content
            className="site-layout-background"
            style={{
              margin: "0 auto",
              height: "inherit",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default ShopLayout;
