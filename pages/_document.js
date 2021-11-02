import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

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

export async function getStaticProps() {
  // This is a real endpoint
  return {
    props: {
      accounts: "adnan",
    },
  };
}

export default MyDocument;
