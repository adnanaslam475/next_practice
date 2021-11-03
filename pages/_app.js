import React, { useEffect } from "react";
import { SnackbarProvider } from "notistack";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import { wrapper } from "../redux";
import { checkServerSideCookie, getCookie } from "../redux/action";

const MyApp = ({ Component, pageProps, token }) => {
   
  return (
    <SnackbarProvider>
      <Layout {...pageProps}>
        <Header />
        <Component {...pageProps} />
      </Layout>
    </SnackbarProvider>
  );
};

export default wrapper.withRedux(MyApp);
