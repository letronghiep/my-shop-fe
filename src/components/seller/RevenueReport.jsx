import { Col, Row } from "antd";
import { formatDate } from "../../helpers/formatDate";
import DualAxesChart from "../charts/DualAxesChart";
import StatisticCustom from "../Statistic";
import GrowthIndicator from "./GrowIndicator";

function RevenueReport({ revenueData }) {
  const {
    current_week_revenue,
    percentage_change,
    daily,
    previous_week,
    order_per,
    total_order,
  } = revenueData;
  const compareText =
    previous_week &&
    formatDate(previous_week.start, "DD/MM") +
      " - " +
      formatDate(previous_week.end, "DD/MM");
  const dataDate = daily && daily.map((item) => formatDate(item.date, "DD/MM"));
  const dataRevenue = daily && daily.map((item) => item.revenue);
  const dataOrder = daily && daily.map((item) => item.order);
  return (
    <Row
      style={{
        width: "100%",
        backgroundColor: "white",
        padding: "10px 20px",
      }}
    >
      <Col span={8} gap={10}>
        <div>
          <StatisticCustom
            value={current_week_revenue}
            title="Tổng doanh thu"
          />
          <GrowthIndicator
            percentage={percentage_change}
            isPositive={!!percentage_change}
            comparisonPeriod={compareText}
          />
        </div>
        <div>
          <StatisticCustom value={total_order} title="Đơn hàng" />
          <GrowthIndicator
            percentage={order_per}
            isPositive={!!order_per}
            comparisonPeriod={compareText}
          />
        </div>
      </Col>
      <Col span={16}>
        {/* <BarChart /> */}
        <DualAxesChart
          dataChart={dataDate}
          dataSetBar={dataRevenue}
          dataSetLine={dataOrder}
          min={0}
          max={50}
        />
      </Col>
    </Row>
  );
}

export default RevenueReport;
