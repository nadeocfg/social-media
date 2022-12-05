import { message } from "antd";
import React, { PropsWithChildren, useState } from "react";

type MessageContextModel = {
  type: "error" | "success" | "warning";
  content: string;
};

export const MessageContext = React.createContext({
  setMessage: ({ type, content }: MessageContextModel) => {},
});

export const MessageContextProvider = (props: PropsWithChildren) => {
  const [messageApi, contextHolder] = message.useMessage();

  const setMessage = ({ type, content }: MessageContextModel) => {
    messageApi.open({
      type,
      content,
    });
  };

  const initState = {
    setMessage: setMessage,
  };

  const [state, setState] = useState(initState);

  return (
    <MessageContext.Provider value={state}>
      {contextHolder}
      {props.children}
    </MessageContext.Provider>
  );
};
