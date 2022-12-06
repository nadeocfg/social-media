import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { LoaderContext } from "../../contexts/loaderContext";
import { SignInContext } from "../../contexts/signInContext";
import Header from "../Header";
import HeadTags from "../HeadTags";
import Loader from "../Loader";
import Sidebar from "../Sidebar";
import SignIn from "../SignIn";

const LayoutTemplate = ({ children }: any) => {
  const router = useRouter();
  const loaderContext = useContext(LoaderContext);
  const signInContext = useContext(SignInContext);

  useEffect(() => {
    signInContext.checkUserToken();
  }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      loaderContext.setLoader(true);
    });

    router.events.on("routeChangeComplete", () => {
      loaderContext.setLoader(false);
    });

    router.events.on("routeChangeError", () => {
      loaderContext.setLoader(false);
    });

    return () => {
      router.events.off("routeChangeStart", () => {
        loaderContext.setLoader(true);
      });

      router.events.off("routeChangeComplete", () => {
        loaderContext.setLoader(false);
      });

      router.events.off("routeChangeError", () => {
        loaderContext.setLoader(false);
      });
    };
  }, [router]);

  return (
    <>
      <HeadTags />

      <Header />

      <Layout>
        <Sider theme="light">
          <Sidebar />
        </Sider>
        <Content>{children}</Content>
      </Layout>

      <SignIn />
      <Loader />
    </>
  );
};

export default LayoutTemplate;
