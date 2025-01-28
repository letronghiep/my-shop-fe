import { formatDate } from "@fullcalendar/core/index.js";
import { Table, Tag } from "antd";
const columns = [
  {
    title: "Tên sản phẩm",
    dataIndex: "product_name",
    key: "product_name",
    render: (text) => <a>{text}</a>,
  },
  
  {
    title: "Số lượng",
    key: "product_quantity",
    dataIndex: "product_quantity",
  },
  {
    title: "Giá",
    dataIndex: "product_price",
    key: "product_price",
    // render: (order) => <a>{order.paymentMethod}</a>,
  },
  {
    title: "Ngày tạo",
    key: "createdAt",
    dataIndex: "createdAt",
    render: (text) => <a>{formatDate(text)}</a>,
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
    title: "Thao tác",
    key: "action",
    render: (text, record) => (
      <div>
        <button className="btn btn-sm btn-danger">Xoa</button>
        <button className="btn btn-sm btn-primary">Sua</button>
        <button className="btn btn-sm btn-success">Xem chi tiet</button>
      </div>

    ),
  }
];

const ProductTable = ({ data }) => {
  return <Table columns={columns} dataSource={data.data} />;
};
export default ProductTable;
