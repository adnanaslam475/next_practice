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
import initializeFirebase from "../../../firebaseconfig";
import { wrapper } from "../../../redux";

const ProductDetails = ({token, enqueueSnackbar, closeSnackbar  }) => {
  const {query}=useRouter()
  const dispatch = useDispatch();
  const [details,setdetails]=React.useState({})

  const dataHandler=res=>{
    setdetails(res)
  }

  useEffect(() => {
    if (!firebase.apps.length) {
      initializeFirebase()
    }
    dispatch(reauthenticate(token))
    dispatch(getProductById(query.id,dataHandler,enqueueSnackbar, closeSnackbar ));
  }, []);

  return (
    <div className="product-details">
      <div className="d-flex"> 
       <Carousel showArrows={true} showThumbs={true} onChange={() => ""}>
            {details?.images?.map((v,i) => (
              <div key={i}>
                <Image
                  src={v}
                  draggable
                  width="100%"
                  height="100%"
                  onDrag={() => ""}
                  className="details_img"
                  alt="Picture of the author"
                /></div>
            ))}
          </Carousel>
          </div>
      <Link href="/">Go Back</Link>
    </div>
  );
};

 export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      let token = req.headers.cookie?.split("=")[1] || null;
      return {
        props: {
          token,
        },
      };
    }
);
export default withSnackbar(ProductDetails);