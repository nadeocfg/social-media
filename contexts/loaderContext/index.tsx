import React, { PropsWithChildren, useState } from "react";

export const LoaderContext = React.createContext({
  isLoading: false,
  setLoader: (isLoading: boolean) => {},
});

export const LoaderContextProvider = (props: PropsWithChildren) => {
  const setLoader = (isLoading: boolean) => {
    setState({ ...state, isLoading: isLoading });
  };

  const initState = {
    isLoading: false,
    setLoader: setLoader,
  };

  const [state, setState] = useState(initState);

  return (
    <LoaderContext.Provider value={state}>
      {props.children}
    </LoaderContext.Provider>
  );
};
