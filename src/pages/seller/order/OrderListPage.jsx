import {
  Breadcrumb,
  Button,
  Flex,
  Input,
  Modal,
  Segmented,
  Select,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SpinLoading from "~/components/loading/SpinLoading";
import OrderTable from "../../../components/table/OrderTable";
import { getOrderByUser } from "../../../services/seller/order";
import { getShipment } from "../../../services/shipment";
import { DatePicker } from "antd";
function OrderListPage() {
  const { Title } = Typography;
  const { Option } = Select;
  const [orders, setOrders] = useState([]);
  const [openModalBill, setOpenModalBill] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [shipment, setShipment] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchType, setSearchType] = useState("order_trackingNumber");
  const [loading, setLoading] = useState(false);
  const [orderSelected, setOrderSelected] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [datePicker, setDatePicker] = useState({
    start: new Date(),
    end: new Date(),
  });
  const { RangePicker } = DatePicker;

  useEffect(() => {
    async function fetchingData() {
      try {
        setLoading(true);
        const [orderData, shipmentData] = await Promise.all([
          getOrderByUser({}),
          getShipment(),
        ]);
        setOrders(orderData.metadata);
        setShipments(shipmentData.metadata);
      } catch (error) {
        console.error(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchingData();
  }, []);
  useEffect(() => {
    async function fetchingOrders() {
      try {
        const orderData = await getOrderByUser(searchParams);
        setOrders(orderData.metadata);
      } catch (error) {
        console.error(error);
      }
    }
    fetchingOrders();
  }, [searchParams]);
  const options = [
    {
      label: (
        <div
          style={{
            padding: 4,
            display: "flex",
            columnGap: 4,
            fontWeight: "600",
          }}
        >
          <div>Tất cả</div>
        </div>
      ),
      value: "all",
    },
    {
      label: (
        <div
          style={{
            padding: 4,
            display: "flex",
            columnGap: 4,
            fontWeight: "600",
          }}
        >
          <div>Chờ xác nhận</div>
        </div>
      ),
      value: "pending",
    },
    {
      label: (
        <div
          style={{
            padding: 4,
            display: "flex",
            columnGap: 4,
            fontWeight: "600",
          }}
        >
          <div>Đang xử lý</div>
        </div>
      ),
      value: "processing",
    },
    {
      label: (
        <div
          style={{
            padding: 4,
            display: "flex",
            columnGap: 4,
            fontWeight: "600",
          }}
        >
          <div>Đang vận chuyển</div>
        </div>
      ),
      value: "delivering",
    },
    {
      label: (
        <div
          style={{
            padding: 4,
            display: "flex",
            columnGap: 4,
            fontWeight: "600",
          }}
        >
          <div>Đã giao</div>
        </div>
      ),
      value: "shipped",
    },
    {
      label: (
        <div
          style={{
            padding: 4,
            display: "flex",
            columnGap: 4,
            fontWeight: "600",
          }}
        >
          <div>Đã hủy</div>
        </div>
      ),
      value: "cancelled",
    },
  ];
  let placeholder = "Nhập mã vận đơn";
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenModalBill(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpenModalBill(false);
  };
  const modalSelectBill = (
    <Modal
      title="Xuất tất cả đơn hàng theo ngày"
      open={openModalBill}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <RangePicker
        onChange={(value, dateString) => {
          setDatePicker({
            start: dateString[0],
            end: dateString[1],
          });
        }}
      />
    </Modal>
  );
  const handleChangeOption = (option) => {
    switch (option) {
      case "order_trackingNumber":
        placeholder = "Nhập mã vận đơn";
        setSearchType(option);
        break;
      case "sku":
        placeholder = "Nhập SKU";
        setSearchType(option);
        break;
      case "user_id":
        placeholder = "Nhập thông tin khách hàng";
        setSearchType(option);
        break;
      default:
        placeholder = "Tìm kiếm theo mã vận đơn, SKU, thông tin khách hàng";
        break;
    }
  };
  const handleChangeShipment = (shipment) => {
    setShipment(shipment);
  };
  const handleConfirmSearch = () => {
    const params = new URLSearchParams(searchParams);
    // if (searchKey) {
    // }
    params.set(searchType, searchKey);
    params.set("shipment", shipment);
    setSearchParams(params);
  };
  const selectBefore = (
    <Select onChange={handleChangeOption} defaultValue="order_trackingNumber">
      <Option value="order_trackingNumber">Mã vận đơn</Option>
      <Option value="sku">SKU</Option>
      <Option value="user_id">Thông tin khách hàng</Option>
    </Select>
  );

  const handleChangeDataOrder = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set(`order_status`, value);
    setSearchParams(params);
  };
  const handleChangeBill = (value) => {
    if (value === "invoice_by_date") {
      setOpenModalBill(true);
    }
  };
  const handleSortOrder = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort_by", value);
    setSearchParams(params);
  };
  if (loading) return <SpinLoading />;
  return (
    <>
      <Breadcrumb
        items={[
          {
            title: <Link to="/seller">Trang chủ</Link>,
          },
          {
            title: "Đơn hàng",
          },
          {
            title: "Quản lý đơn hàng",
          },
        ]}
      />
      <Title
        style={{
          marginTop: 24,
          marginBottom: 16,
        }}
        level={4}
      >
        Danh sách đơn hàng
      </Title>
      <Segmented
        onChange={(value) => handleChangeDataOrder(value)}
        options={options}
      />
      <Flex
        gap={20}
        style={{
          maxWidth: "70%",
          margin: "24px 0px",
        }}
      >
        <Input
          style={{
            flex: 2,
          }}
          addonBefore={selectBefore}
          placeholder={placeholder}
        />
        <Select
          onChange={handleChangeShipment}
          style={{ width: "auto", flex: 1 }}
          defaultValue="all"
        >
          <Option value="all" disabled>
            Đơn vị vận chuyển
          </Option>
          {shipments.map((shipment) => (
            <Option key={shipment.id} value={shipment.shipment_slug}>
              {shipment.shipment_name}
            </Option>
          ))}
        </Select>
        <Button onClick={handleConfirmSearch} type="primary">
          Áp dụng
        </Button>
        <Button type="default">Đặt lại</Button>
      </Flex>
      <Select
        defaultValue="confirmed_date_asc"
        onChange={(value) => handleSortOrder(value)}
      >
        <Option value="confirmed_date_asc">
          Ngày xác nhận đơn đặt hàng(Xa - Gần nhất)
        </Option>
        <Option value="confirmed_date_desc">
          Ngày xác nhận đơn đặt hàng(Gần - Xa nhất)
        </Option>
        <Option value="create_date_asc">Ngày tạo đơn(Xa - Gần nhất)</Option>
        <Option value="create_date_desc">Ngày tạo đơn(Gần - Xa nhất)</Option>
      </Select>
      <Flex gap={10} style={{ marginTop: 20, marginBottom: 20 }}>
        <Title level={5}>Đơn hàng: {orders.data?.length}</Title>
        <Select
          style={{ width: 240 }}
          placeholder="Xuất hóa đơn"
          onChange={(value) => handleChangeBill(value)}
        >
          <Option value="invoice_by_date">Toàn bộ hóa đơn theo ngày</Option>
          <Option
            value="invoice_by_choose"
            disabled={!orderSelected?.length > 0}
          >
            Đơn hàng được chọn
          </Option>
        </Select>
      </Flex>

      <OrderTable data={orders} />
      {
        openModalBill && modalSelectBill
        // modalConfirmDelete && modalConfirmDeleteOrder
      }
    </>
  );
}

export default OrderListPage;
