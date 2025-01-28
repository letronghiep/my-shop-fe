import { formatDate } from "@fullcalendar/core/index.js";
import { Table, Tag } from "antd";
const columns = [
  {
    title: "Mã vận đơn",
    dataIndex: "order_trackingNumber",
    key: "order_trackingNumber",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Trạng thái",
    dataIndex: "order_status",
    key: "order_status",
    render: (text) => {
      switch (text) {
        case "pending":
          return   <Tag color="green">Đang xử lý</Tag>;
        case "shipping":
          return <a style={{ color: "blue" }}>Dang giao</a>;
        case "delivered":
          return <a style={{ color: "green" }}>Da giao</a>;
        default:
          return <a>{text}</a>;
      }
    },
  },
  {
    title: "Số lượng",
    key: "total_product",
    dataIndex: "total_product",
  },
  {
    title: "Phương thức thanh toán",
    dataIndex: "order_payment",
    key: "order_payment",
    render: (order) => <a>{order.paymentMethod}</a>,
  },
  {
    title: "Ngày tạo",
    key: "createdAt",
    dataIndex: "createdAt",
    render: (text) => <a>{formatDate(text)}</a>,
  },
];

const OrderTable = ({ data }) => {
  return <Table columns={columns} dataSource={data.data} />;
};
export default OrderTable;
