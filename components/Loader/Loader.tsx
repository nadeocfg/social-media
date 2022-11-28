import SpinFC from "antd/lib/spin";
import { useContext, useState } from "react";
import { LoaderContext } from "../../contexts/loaderContext";
import styles from "../../styles/Loader.module.scss";

const Loader = () => {
  const loaderContext = useContext(LoaderContext);

  if (loaderContext.isLoading) {
    return (
      <div className={styles.loader}>
        <SpinFC spinning={loaderContext.isLoading} size="large" />
      </div>
    );
  }

  return <></>;
};

export default Loader;
