import { formatDate } from "@fullcalendar/core/index.js";
import { Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const ProductTable = ({ data }) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
      width: "400px",
      ellipsis: true,
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
      dataIndex: "product_status",
      key: "product_status",
      render: (text) => {
        switch (text) {
          case "published":
            return <Tag color="green">Đang hoạt động</Tag>;
          case "draft":
            return <a style={{ color: "blue" }}>Chưa được đăng</a>;
          case "blocked":
            return <a style={{ color: "red" }}>Vi phạm</a>;
          default:
            return <a>{text}</a>;
        }
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <div className="flex flex-col">
          <button
            onClick={() => navigate(`/seller/products/edit/${record._id}`)}
            className="btn btn-sm btn-primary"
          >
            Cập nhật
          </button>
          <button className="btn btn-sm btn-danger">Xóa</button>
          <button className="btn btn-sm btn-success">Xem chi tiet</button>
        </div>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data?.data} pagination={true} />;
};
export default ProductTable;
