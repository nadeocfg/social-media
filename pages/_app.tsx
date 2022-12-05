import "../styles/fonts.scss";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { LoaderContextProvider } from "../contexts/loaderContext";
import { SignInContextProvider } from "../contexts/signInContext";
import { MessageContextProvider } from "../contexts/messageContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MessageContextProvider>
      <LoaderContextProvider>
        <SignInContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SignInContextProvider>
      </LoaderContextProvider>
    </MessageContextProvider>
  );
}
