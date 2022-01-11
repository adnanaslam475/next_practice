import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { wrapper } from "../redux";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req, res }) => {
//       let authToken = req.headers.cookie?.split("=")[1] || null;
//       console.log("req.headers_documents...", store, req.headers);
//       return {
//         props: {
//           authToken,
//         },
//       };
//     }
// );
export default MyDocument;
