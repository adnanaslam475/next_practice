import { wrapper } from "../redux";
// import styles from "../styles/Layout.module.scss";
// import Cookie from "js-cookie";

const Layout = ({ children, ...pageProps }) => {
  return <div className='container_main'>{children}</div>;
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req }) => {
      // console.log('layout getderversideprops', store)
      // console.log('layout getderversideprops', req)
//     }
// );

export default Layout;
