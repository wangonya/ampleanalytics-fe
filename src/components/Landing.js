import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Button,
  Row,
  Col,
  Card,
  Select,
  PageHeader,
  Statistic,
  Table,
  Image,
  Result,
  Modal,
  Form,
  Input,
} from "antd";

import landing from "../x.png";
import { useApi } from "../use-api";

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
        <ResponsiveContainer width="100%" height={400}>
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

const Breakdown = (props) => {
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BE_URL}/analytics/breakdown?period=${props.filter}`
    )
      .then((response) => response.json())
      .then((data) => setState(data))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  }, [props]);
  return (
    <Row style={{ padding: "20px 0 20px" }} gutter={18}>
      <Col span={8}>
        <Card title="Top Consumers">
          <Table
            columns={[
              {
                title: "Consumer",
                dataIndex: "consumer",
                key: "consumer",
              },
              {
                title: "Hits",
                dataIndex: "hits",
                key: "hits",
              },
            ]}
            dataSource={state.top_consumers}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Top Platforms">
          {" "}
          <Table
            columns={[
              {
                title: "Platform",
                dataIndex: "platform",
                key: "platform",
              },
              {
                title: "Hits",
                dataIndex: "hits",
                key: "hits",
              },
            ]}
            dataSource={state.top_platforms}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Top User Agents">
          {" "}
          <Table
            columns={[
              {
                title: "User Agent",
                dataIndex: "user_agent",
                key: "user_agent",
              },
              {
                title: "Hits",
                dataIndex: "hits",
                key: "hits",
              },
            ]}
            dataSource={state.top_user_agents}
          />
        </Card>
      </Col>
    </Row>
  );
};

const ProjectCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new project"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the name of the project",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Landing = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  const [createProjectModalvisible, setCreateProjectModalVisible] =
    useState(false);

  const onCreateProject = (values) => {
    console.log("Received values of form: ", values);
    const { loading, error, refresh, data } = useApi("/projects", {
      audience: "ampleanalyticsapi",
      method: "POST",
      body: JSON.stringify(values),
    });
    setCreateProjectModalVisible(false);
  };

  const { loading, error, refresh, data } = useApi("/projects", {
    audience: "ampleanalyticsapi",
  });
  let project = data;
  console.log('data', data);

  const { Option } = Select;
  const [filter, setFilter] = useState(
    localStorage.getItem("filter") || "last_7_days"
  );
  const onFilterChange = (filter) => {
    setFilter(filter);
    localStorage.setItem("filter", filter);
  };
  return isAuthenticated ? (
    project ? (
      <div>
        <PageHeader
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
        <Breakdown filter={filter} />
      </div>
    ) : (
      <div>
        <Result
          status="404"
          title="No Projects Found"
          subTitle="You don't have any projects yet."
          extra={
            <Button
              type="primary"
              onClick={() => {
                setCreateProjectModalVisible(true);
              }}
            >
              Create Project
            </Button>
          }
        />
        <ProjectCreateForm
          visible={createProjectModalvisible}
          onCreate={onCreateProject}
          onCancel={() => {
            setCreateProjectModalVisible(false);
          }}
        />
      </div>
    )
  ) : (
    <Row>
      <Col style={{ padding: "20px" }} span={8}>
        <h2 className="headline">Simple analytics for your backend APIs</h2>
        <Button type="primary" onClick={() => loginWithRedirect()}>
          Get Started
        </Button>
      </Col>
      <Col span={16}>
        <Image src={landing} preview={false} />
      </Col>
    </Row>
  );
};

export default Landing;
