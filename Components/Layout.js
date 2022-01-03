import { wrapper } from "../redux";
// import styles from "../styles/Layout.module.scss";
// import Cookie from "js-cookie";

const Layout = ({ children, ...pageProps }) => {
  // const dispatch = useDispatch();
  return <div className='container_main'>{children}</div>;
}; 

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      // console.log('layout getderversideprops')
    }
);

export default Layout;
