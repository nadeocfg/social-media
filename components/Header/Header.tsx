import { Button, Tooltip } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { SignInContext } from "../../contexts/signInContext";
import { useContext } from "react";

const Header = () => {
  const signInContext = useContext(SignInContext);

  const showModal = () => {
    signInContext.showModal(true);
  };

  return (
    <header>
      <div className="logo">
        <span>kotabook</span>
      </div>

      <Tooltip title="Login">
        <Button shape="circle" icon={<LoginOutlined />} onClick={showModal} />
      </Tooltip>
    </header>
  );
};

export default Header;
