import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { wrapper } from "../redux";
import firebase from "firebase";

const Layout = ({ token, children }) => {
  // Listen authenticated user
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        console.log("user....", user);
      });
      if (firebase.apps.length) {
        const user = firebase.auth().currentUser;
        
        console.log("user1....", user);
      return () => unregisterAuthObserver();
    }
  }, []);

  return <div className="container_main">{children}</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      let authToken = req.headers.cookie?.split("=")[1] || null;
      console.log("getServerSideProps_lyout...", req.headers);
      return {
        props: {
          authToken,
        },
      };
    }
);

export default Layout;
