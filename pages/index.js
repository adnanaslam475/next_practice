import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Head from "next/head";
// import {GetServerSideProps,GetStaticProps,GetStaticPaths} from "next";
import "bootstrap/dist/css/bootstrap.css";
import { wrapper } from "../redux/index";
import { reauthenticate, getProducts } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import { withSnackbar } from "notistack";
import { Grid, CircularProgress } from "@material-ui/core";
import InitializeFirebase from "../firebaseconfig";
import ProductCard from "../Components/ProductCard";

export function useIntersectionObserver(ref, options, forward) {
  const [element, setElement] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useRef(null);

  const cleanOb = () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };

  useEffect(() => {
    setElement(ref.current);
  }, [ref]);

  useEffect(() => {
    if (!element) return;
    cleanOb();
    const ob = (observer.current = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        if (!forward) {
          setIsIntersecting(isElementIntersecting);
        } else if (forward && !isIntersecting && isElementIntersecting) {
          setIsIntersecting(isElementIntersecting);
          cleanOb();
        }
      },
      { ...options }
    ));
    ob.observe(element);
    return () => {
      cleanOb();
    };
  }, [element, options]);

  return isIntersecting;
}

function Home({ token, enqueueSnackbar, closeSnackbar, authToken }) {
  const dispatch = useDispatch();
  const loadingRef = useRef();
  const ref = useRef();
  const [page, setpage] = useState(0);
  const { products } = useSelector((s) => s.products);

  useEffect(() => {
    if (!firebase.apps.length) {
      InitializeFirebase();
    }
    dispatch(reauthenticate(token));
    dispatch(getProducts(page, enqueueSnackbar, closeSnackbar));
    // const unregisterAuthObserver = firebase
    //   .auth()
    //   .onAuthStateChanged((user) => {
    //   });
    if (firebase.apps.length) {
      // return () => unregisterAuthObserver();
      
      const user = firebase.auth().currentUser;
      console.log("usrer", user);
      if (user !== null) {
        user.providerData.forEach((profile) => {
          console.log("Sign-in provider: " + profile.providerId);
          
        });
      }
    }
  }, []);

  useEffect(() => {
    dispatch(getProducts(page, enqueueSnackbar, closeSnackbar));
  }, [page]);

  const isBottomVisible = useIntersectionObserver(
    loadingRef,
    {
      threshold: 0,
    },
    false
  );

  useEffect(() => {
    isBottomVisible && setpage(page + 1);
  }, [isBottomVisible]);

  return (
    <div className="container">
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
      <div className="main">
        <Grid spacing={5} style={{ minHeight: "800px" }} container>
          {products.length &&
            products.map((v, i) => <ProductCard key={i} data={v} />)}
        </Grid>
        <div
          ref={loadingRef}
          style={{
            height: "100px",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <CircularProgress color="primary" size={50} />
        </div>
      </div>
    </div>
  );
}
//yhn getserversideprop lazmi h HYDRATE call krane klye

//new version
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      let authToken = req.headers.cookie?.split("=")[1] || null;
      // console.log("HOME<", req.headers.cookie);
      return {
        props: {
          authToken,
        },
      };
    }
);

export default withSnackbar(Home);
