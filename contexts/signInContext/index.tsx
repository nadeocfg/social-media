import React, { PropsWithChildren, useContext, useState } from "react";
import { SignInResponseModel } from "../../models/contextModels";
import api from "../../utils/axios";
import { MessageContext } from "../messageContext";

export const SignInContext = React.createContext({
  isModalShow: false,
  showModal: (isLoading: boolean) => {},
  authUser: ({ email, password }: { email: string; password: string }) => {},
  setSingInResponse: (data: SignInResponseModel) => {},
  checkUserToken: () => {},
  logout: () => {},
  signInResponse: {
    token: "",
    username: "",
    name: "",
    email: "",
    sex: "",
    photo: "",
    about: "",
    createdAt: "",
    updatedAt: "",
  },
});

export const SignInContextProvider = (props: PropsWithChildren) => {
  const messageContext = useContext(MessageContext);

  const showModal = (isShow: boolean) => {
    setState({ ...state, isModalShow: isShow });
  };

  const setSingInResponse = (data: SignInResponseModel) => {
    setState({
      ...state,
      signInResponse: data,
    });
  };

  const authUser = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const data = {
      email,
      password,
    };

    api
      .post("/api/auth", data)
      .then((res) => {
        messageContext.setMessage({
          type: "success",
          content: "Logged in",
        });
        showModal(false);
        setSingInResponse(res.data);
        window.localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        messageContext.setMessage({
          type: "error",
          content: err.response.data.message,
        });
        showModal(true);
      });
  };

  const checkUserToken = () => {
    const token = window.localStorage.getItem("token") || "";

    if (!token) {
      return;
    }

    api
      .post("/api/auth/check-user/", { token })
      .then((res) => {
        setSingInResponse(res.data);
      })
      .catch((err) => {
        messageContext.setMessage({
          type: "error",
          content: err.response.data.message,
        });
      });
  };

  const logout = () => {
    setSingInResponse({
      token: "",
      username: "",
      name: "",
      email: "",
      sex: "",
      photo: "",
      about: "",
      createdAt: "",
      updatedAt: "",
    });
  };

  const [state, setState] = useState({
    isModalShow: false,
    showModal: showModal,
    setSingInResponse: setSingInResponse,
    authUser: authUser,
    checkUserToken: checkUserToken,
    logout: logout,
    signInResponse: {
      token: "",
      username: "",
      name: "",
      email: "",
      sex: "",
      photo: "",
      about: "",
      createdAt: "",
      updatedAt: "",
    },
  });

  return (
    <SignInContext.Provider value={state}>
      {props.children}
    </SignInContext.Provider>
  );
};
