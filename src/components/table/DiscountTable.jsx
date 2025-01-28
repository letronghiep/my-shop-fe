import { Table } from "antd";
const columns = [
  {
    title: "Mã voucher",
    dataIndex: "discount_code",
    key: "discount_code",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tên voucher",
    dataIndex: "discount_name",
    key: "discount_name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Loại mã",
    key: "discount_applies_to",
    dataIndex: "discount_applies_to",
    render: (discount_applies_to) => (
      <a>
        {discount_applies_to === "specific"
          ? "Mã giảm giá cho sản phẩm"
          : "Mã giảm giá toàn shop"}
      </a>
    ),
  },
  {
    title: "Đơn tối đa",
    dataIndex: "discount_max_value",
    key: "discount_max_value",
  },
  {
    title: "Đơn tối thiểu",
    dataIndex: "discount_max_value",
    key: "discount_max_value",
  },
  {
    title: "Số lượng",
    key: "discount_uses_count",
    dataIndex: "discount_uses_count",
  },
  {
    title: "Giá trị",
    key: "discount_value",
    dataIndex: "discount_value",
  },
];

const DiscountTable = ({ data }) => {
  return <Table columns={columns} dataSource={data} />;
};
export default DiscountTable;
