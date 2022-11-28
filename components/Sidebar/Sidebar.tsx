import { Menu, MenuProps } from "antd";
import {
  MessageOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState("0");
  const router = useRouter();

  const onSelectItem: MenuProps["onClick"] = (e) => {
    setSelectedItem(e.key);
  };

  const items = useMemo(
    () => [
      {
        icon: <UnorderedListOutlined />,
        label: <Link href="/">Feed</Link>,
        children: null,
        path: "/",
        key: 0,
      },
      {
        icon: <MessageOutlined />,
        label: <Link href="/messages">Messages</Link>,
        children: null,
        path: "/messages",
        key: 1,
      },
      {
        icon: <UsergroupAddOutlined />,
        label: <Link href="/friends">Friends</Link>,
        children: null,
        path: "/friends",
        key: 2,
      },
    ],
    []
  );

  useEffect(() => {
    const founded = items.find((item) => item.path === router.pathname);
    if (founded) {
      setSelectedItem(founded.key + "");
    } else {
      setSelectedItem("");
    }
  }, [router.pathname, items]);

  return (
    <Menu
      onClick={onSelectItem}
      mode={"inline"}
      items={items}
      selectedKeys={[selectedItem]}
    />
  );
};

export default Sidebar;
