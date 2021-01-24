import {Breadcrumb} from "antd";
import {UserOutlined, CalendarOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
export default function NavBar() {
  return (
    <Breadcrumb style={{display: "flex", justifyContent: "center"}}>
      <Breadcrumb.Item>
        <Link to="/">
          <UserOutlined />
          <span>Список контактов</span>
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to="/calendar">
          <CalendarOutlined />
          <span>Календарь</span>
        </Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
