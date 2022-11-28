import React, { PropsWithChildren, useState } from "react";

export const SignInContext = React.createContext({
  isModalShow: false,
  showModal: (isLoading: boolean) => {},
  setSignInData: (name: string, value: string) => {},
  signInData: {
    login: "",
    password: "",
  },
});

export const SignInContextProvider = (props: PropsWithChildren) => {
  const showModal = (isShow: boolean) => {
    setState({ ...state, isModalShow: isShow });
  };

  const setSignInData = (name: string, value: string) => {
    setState({
      ...state,
      signInData: {
        ...state.signInData,
        [name]: value,
      },
    });
  };

  const [state, setState] = useState({
    isModalShow: false,
    showModal: showModal,
    setSignInData: setSignInData,
    signInData: {
      login: "",
      password: "",
    },
  });

  return (
    <SignInContext.Provider value={state}>
      {props.children}
    </SignInContext.Provider>
  );
};
