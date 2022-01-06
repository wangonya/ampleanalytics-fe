import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button, Row, Col, Card, Select, PageHeader, Statistic } from "antd";

const Aggregate = (props) => {
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BE_URL}/analytics/aggregate?period=${props.filter}`
    )
      .then((response) => response.json())
      .then((data) => setState(data))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  }, [props]);

  return (
    <Row gutter={24} style={{ paddingLeft: "40px" }}>
      <Col span={4}>
        <Statistic title="Consumers" value={state.consumers} />
      </Col>
      <Col span={4}>
        <Statistic title="Hits" value={state.hits} />
      </Col>{" "}
      <Col span={4}>
        <Statistic
          title="2xx Responses"
          value={state.two_xx_responses}
          valueStyle={{ color: "#4BB543" }}
        />
      </Col>
      <Col span={4}>
        <Statistic
          title="4xx Responses"
          value={state.four_xx_responses}
          valueStyle={{ color: "#ffcc00" }}
        />
      </Col>{" "}
      <Col span={4}>
        <Statistic
          title="5xx Responses"
          value={state.five_xx_responses}
          valueStyle={{ color: "#FF0000" }}
        />
      </Col>
    </Row>
  );
};

const Timeseries = (props) => {
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BE_URL}/analytics/timeseries?period=${props.filter}`
    )
      .then((response) => response.json())
      .then((data) => setState(data))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  }, [props]);
  return (
    <Row style={{ padding: "20px 0 20px" }}>
      <Col style={{ width: 900 }}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={state}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="period"
              interval="preserveStartEnd"
              minTickGap={10}
            />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="hits"
              stroke="#8884d8"
              fill="url(#color)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
};

const Landing = () => {
  const { Option } = Select;
  const [filter, setFilter] = useState(
    localStorage.getItem("filter") || "last_7_days"
  );
  const onFilterChange = (filter) => {
    setFilter(filter);
    localStorage.setItem("filter", filter);
  };
  return (
    <div>
      <PageHeader
        className="site-page-header-responsive"
        title="Title"
        subTitle="This is a subtitle"
        extra={[
          <Select
            defaultValue={filter}
            style={{ margin: "0 8px", paddingBottom: "10px" }}
            onChange={onFilterChange}
          >
            <Option value="today">Today</Option>
            <Option value="last_7_days">Last 7 days</Option>
            <Option value="last_30_days">Last 30 days</Option>
          </Select>,
        ]}
      />

      <Card>
        <Aggregate filter={filter} />
        <Timeseries filter={filter} />
      </Card>
    </div>
  );
};

export default Landing;
