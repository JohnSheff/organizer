import {Menu} from "antd";
import {UserOutlined, CalendarOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
export default function NavBar() {
  return (
    <Menu style={{display: "flex", justifyContent: "center"}}>
      <Menu.Item>
        <Link to="/">
          <UserOutlined />
          <span>Список контактов</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/calendars">
          <CalendarOutlined />
          <span>Календарь</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
}
