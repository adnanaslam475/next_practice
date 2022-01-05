import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import { wrapper } from "../redux/index";
import styles from "../styles/Home.module.scss";
import { reauthenticate, getProducts } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import { useEffect } from "react";
import { withSnackbar } from "notistack";
import { Grid } from "@material-ui/core";
import InitializeFirebase from "../firebaseconfig";
import Productcard from "../Components/ProductCard";

function Home({ token, enqueueSnackbar, closeSnackbar }) {
  const dispatch = useDispatch();
  const { products } = useSelector((s) => s.products);

  useEffect(() => {
    if (!firebase.apps.length) {
      InitializeFirebase()
    }
    dispatch(reauthenticate(token));
    dispatch(getProducts(enqueueSnackbar, closeSnackbar));
  }, []);

  return (
    <div className='container'>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
        crossOrigin="anonymous"
      />
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='main'>
        <Grid spacing={5}style={{}} container>
          {products?.length &&
            products.map((v, i) => <Productcard key={i} data={v} />)}
        </Grid>
      </div>
    </div>
  );
}
//yhn getserversideprop lazmi h HYDRATE call krane klye

//new version
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      let token = req.headers.cookie?.split("=")[1] || null;
      store.dispatch(reauthenticate(token));
      return {
        props: {
          token,
        },
      };
    }
);
export default withSnackbar(Home);
