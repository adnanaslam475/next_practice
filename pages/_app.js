import React from "react";
import { SnackbarProvider } from "notistack";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import "../styles/globals.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { wrapper } from "../redux";

const MyApp = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
    <SnackbarProvider>
      <Layout {...pageProps}>
        <Header />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Layout>
    </SnackbarProvider>
    </QueryClientProvider>
  );
};

export default wrapper.withRedux(MyApp);
