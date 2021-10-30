import React from "react";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import { wrapper } from "../redux";

const MyApp = ({ Component, pageProps }) => {
  // console.log("ct,prgPRop--->", Component, pageProps);
  return (
    <Layout>
      <Header />
      <Component {...pageProps} />
    </Layout>
  );
};
export default wrapper.withRedux(MyApp);
