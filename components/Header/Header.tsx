import { Avatar, Button, Dropdown, Tooltip } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { SignInContext } from "../../contexts/signInContext";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const signInContext = useContext(SignInContext);

  const logout = () => {
    signInContext.logout();
  };

  const items = [
    {
      key: "1",
      label: <Link href="/profile">Profile</Link>,
    },
    {
      key: "2",
      label: (
        <a href="#" onClick={logout}>
          Logout
        </a>
      ),
    },
  ];

  const showModal = () => {
    signInContext.showModal(true);
  };

  return (
    <header>
      <div className="logo">
        <span>kotabook</span>
      </div>

      {signInContext.signInResponse.token ? (
        <Dropdown menu={{ items }}>
          <Avatar src={signInContext.signInResponse.photo} />
        </Dropdown>
      ) : (
        <Tooltip title="Login">
          <Button shape="circle" icon={<LoginOutlined />} onClick={showModal} />
        </Tooltip>
      )}
    </header>
  );
};

export default Header;
