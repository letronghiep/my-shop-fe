import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, notification, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpinLoading from "../../components/loading/SpinLoading";
import RevenueReport from "../../components/seller/RevenueReport";
import Section from "../../components/seller/Section";
import TodoBox from "../../components/seller/TodoBox";
import Notifications from "../../components/seller/notifications/Notifications";
import DiscountTable from "../../components/table/DiscountTable";
import { getDiscountByShop } from "../../services/discount";
import { getNotification } from "../../services/notifications";
import { analysisSeller } from "../../services/seller/analysis";
import { socket } from "../../socket";
import { setDataOrder } from "../../stores/slices/seller/orderSlice";

function SalePage() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [discounts, setDiscounts] = useState();
  const [currentWeek, setCurrentWeek] = useState({
    start: new Date(),
    end: new Date(),
  });
  const orderSlice = useSelector((state) => state.order);
  const [orderStatus, setOrderStatus] = useState({
    pending: 0,
    processing: 0,
    delivering: 0,
    shipped: 0,
    canceled: 0,
    refunded: 0,
  });
  const [revenue, setRevenue] = useState(0);
  const data = useSelector((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        if (data) {
          setUser(data.user);
        }
      } catch (error) {
        notification.error({
          message: error.message,
          duration: 5,
          placement: "topRight",
          icon: <ExclamationCircleOutlined style={{ color: "red" }} />,
          key: "salepage-error",
          closable: true,
          showProgress: true,
        });
      }
    };
    getUser();
  }, [dispatch, data]);
  useEffect(() => {
    async function fetchData() {
      if (!user?._id) return;
      try {
        setLoading(true);
        const [notifies, analysis, discounts] = await Promise.all([
          getNotification(user._id, false),
          analysisSeller(),
          getDiscountByShop(),
        ]);
        setNotifications(notifies.metadata);
        if (analysis) {
          const { order, revenue_report } = analysis.metadata;
          setOrderStatus({
            pending: order.pending,
            confirmed: order.confirmed,
            shipped: order.shipped,
            delivered: order.delivered,
            canceled: order.canceled,
          });
          dispatch(
            setDataOrder({
              pending: order.pending,
              confirmed: order.confirmed,
              shipped: order.shipped,
              delivered: order.delivered,
              canceled: order.canceled,
            })
          );
          setRevenue(revenue_report);
          setCurrentWeek({
            start: new Date(revenue_report.current_week.start),
            end: new Date(revenue_report.current_week.end),
          });
        }
        if (discounts) {
          setDiscounts(discounts.metadata);
        }
        socket.on("read:notification", async () => {
          const data = await getNotification(user._id, false);
          setNotifications(data.metadata);
        });
        return () => {
          socket.off("read:notification");
        };
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);
  const revenueSubTitle = (
    <span>
      7 ngày qua:{" "}
      {currentWeek.start.toLocaleDateString({
        language: "vi-vn",
      })}
      -
      {currentWeek.end.toLocaleDateString({
        language: "vi-vn",
      })}
    </span>
  );
  if (loading) return <SpinLoading />;
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Section title="Những việc cần làm">
            <Row
              style={{
                backgroundColor: "white",
              }}
            >
              <TodoBox
                span={6}
                title="Chờ xác nhận"
                href="/seller/orders"
                value={orderStatus.pending}
              />
              <TodoBox
                span={6}
                title="Đã xác nhận"
                href="/seller/orders"
                value={orderStatus.processing}
              />
              <TodoBox
                span={6}
                title="Đang vận chuyển"
                href="/seller/orders"
                value={orderStatus.delivering}
              />
              <TodoBox
                span={6}
                title="Đã giao"
                href="/seller/orders"
                value={orderStatus.shipped}
              />
              <TodoBox
                span={6}
                title="Đã hùy"
                href="/seller/orders"
                value={orderStatus.canceled}
              />
              <TodoBox
                span={6}
                title="Trả hàng/hoàn tiền"
                href="/seller/orders"
                value={orderStatus.refunded}
              />
            </Row>
          </Section>
          <Section
            // style={{ marginTop: "20px" }}
            title="Hiệu quả kinh doanh"
            subTitle={revenueSubTitle}
            viewLink="Xem thêm"
          >
            <RevenueReport revenueData={revenue} />
          </Section>
          <Section
            // style={{ marginTop: "20px" }}
            title="Danh sách voucher"
            viewLink="Xem thêm"
          >
            <DiscountTable data={discounts} />
          </Section>
        </Col>
        <Col span={8}>
          <Notifications notifications={notifications} />
        </Col>
      </Row>
    </>
  );
}

export default SalePage;
