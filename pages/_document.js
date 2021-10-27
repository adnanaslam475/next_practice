import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  constructor(props){
    super(props);
    this.state={

    }
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
    )
  }
}

export async function getStaticProps() {
  // This is a real endpoint
  const res = await fetch('https://sampleapis.com/fakebank/api/Accounts');
  const accounts = await res.json();
  return {
    props: {
      accounts: accounts.slice(0, 10),
    },
  };
}

export default MyDocument