import React from "react";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import { wrapper } from "../redux";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Header />
      <Component {...pageProps} />
    </Layout>
  );
};

export default wrapper.withRedux(MyApp);
