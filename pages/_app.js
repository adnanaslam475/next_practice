import React, { useEffect } from "react";
import { SnackbarProvider } from "notistack";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import { wrapper } from "../redux";
import cookie from "js-cookie";
import router from "next/router";
import { checkServerSideCookie, getCookie } from "../redux/action";
// import { Provider } from "next-auth/client";

const MyApp = ({ Component, pageProps, token }) => {
  // const getCookieFromBrowser = (key) => {
  //   return cookie.get(key);
  // };
  // useEffect(() => {
  //   if (!getCookieFromBrowser("token")) {
  //     router.push("/register");
  //   }
  // }, []);
  console.log("token,,,", token);

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
