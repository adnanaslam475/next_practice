import { wrapper } from "../redux";
import styles from "../styles/Layout.module.scss";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { getCookie } from "../redux/action";

const Layout = ({ children, ...pageProps }) => {
  // console.log("Layout...", pageProps);
  const dispatch = useDispatch();

  return <div className={styles.containeor_main}>{children}</div>;
};
// Are you an a// export const getInitialAppProps = wrapper.getInitialAppProps(
//   (store) =>
//     async ({ req, res }) => {
//       console.log("getInitialPageProps_lyout==>", req, res);
//     }
// );

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      // console.log('layout getderversideprops')
    }
);

export default Layout;
