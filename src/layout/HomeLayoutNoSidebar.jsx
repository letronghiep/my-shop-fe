import { Layout, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../components/header/Header";
import { getAuth } from "../stores/slices/authSlice";

function HomeLayoutNoSidebar({ children }) {
  const { Content } = Layout;
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
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
      }
    }
    getUserData();
  }, [dispatch, navigate, userId]);
  return (
    <Layout>
      <HomeHeader user={user} />
      <Content
        style={{
          maxWidth: "1440px",
          minWidth: "1280px",
          margin: "auto",
          width: "100%",
          padding: "0px 24px",
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
          {children}
        </Layout>
      </Content>
    </Layout>
  );
}

export default HomeLayoutNoSidebar;
