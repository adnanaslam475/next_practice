/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import Link from "next/link";
import firebase from "firebase";
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";
import { getProductById, reauthenticate } from "../../../redux/action";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { withSnackbar } from "notistack";
import {useQuery,useQueries} from 'react-query'
import initializeFirebase from "../../../firebaseconfig";
import { wrapper } from "../../../redux";
import { CircularProgress } from "@material-ui/core";
// import { notification } from "../../../Components/notification";

const ProductDetails = ({ token, enqueueSnackbar, closeSnackbar }) => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  // const [details, setdetails] = React.useState({});

  const dataHandler = (res) => {
};

  useEffect(() => {
    if (!firebase.apps.length) {
      initializeFirebase();
    }
    dispatch(reauthenticate(token));
    // dispatch(
      //   getProductById(query.id, dataHandler, enqueueSnackbar, closeSnackbar)
      // );
    }, []);
    const { isLoading, isError, isSuccess, data,status } = useQuery(
      `searchProducts-${query.id}`, ()=>getProductById(query.id,dataHandler, enqueueSnackbar, closeSnackbar),
    );
  console.log('dataa...',data)


  return (
    <div className="product-details">
      {isLoading&&<div className="center"><CircularProgress size={40}color="primary" /></div>}
      {!isLoading&&<div className="d-flex">
        <Carousel showArrows={true} showThumbs={true} onChange={() => ""}>
          {data?.images?.map((v, i) => (
            <div key={i}>
              <Image
                src={v}
                draggable
                width="100%"
                height="100%"
                onDrag={() => ""}
                className="details_img"
                alt="Picture of the author"
              />
            </div>
          ))}
        </Carousel>
      </div>}
      <Link href="/">Go Back</Link>
    </div>
  )
};


export default withSnackbar(ProductDetails);
