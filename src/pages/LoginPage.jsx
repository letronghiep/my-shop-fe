import { notification } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { loginAuth } from "../stores/slices/authSlice";

function LoginPage() {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      const res = await dispatch(loginAuth(data)).unwrap();
      const { user } = res;
      if (user) {
        const permission = user.usr_role.rol_name;
        // router.replace(decodeURIComponent(redirectTo));
        if (permission === "shop") {
          navigate("/seller");
        } else if (permission === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      notification.error({
        message: error,
        showProgress: true,
        placement: "top",
      });
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      // router.replace(decodeURIComponent(redirectTo));
      // history.replaceState();
    }
  }, [isAuthenticated]);
  useEffect(() => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("client_id");
    // dispatch(logoutAuth())
  }, []);
  return <LoginForm onSubmit={onSubmit} title="" loading={loading} />;
}
export default LoginPage;
