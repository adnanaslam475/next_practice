import React, { useCallback, useEffect, useRef, useState } from "react";
import { addProduct } from "../redux/action";
import { withSnackbar } from "notistack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import Link from "next/link";
import Grid from "@mui/material/Grid";
import withAuth from "../Components/WithAuth";
import Image from "next/image";
import firebase from "firebase/app";
import { useSelector, useDispatch } from "react-redux";
import FirebaseApp from "../firebaseconfig";
import { FormControl } from "@mui/material";
import { inputs } from "../constants";
import "firebase/firestore";
import { CircularProgress, IconButton } from "@material-ui/core";
import { Close } from "@mui/icons-material";

function CreateProduct({ enqueueSnackbar, closeSnackbar }) {
  // const s = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [Images, setImages] = useState([]);
  const [uploadErr, setUploadErr] = useState("");
  const [drgitemindex, setDrgitemindex] = useState(null);
  const [uploadedValue, setUplodadedValue] = useState(0);
  const [isloading, setisloading] = useState(false);
  const frm = useRef();
  const [inputvalues, setinputvalues] = useState({
    name: "",
    details: "",
    price: 0,
    category: "",
  });

  useEffect(() => {
    if (!firebase.apps.length) {
      FirebaseApp();
    } else {
      firebase.app();
    }
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (Object.values(inputvalues).every((v) => v.length) && Images.length) {
      dispatch(addProduct(inputvalues, Images, enqueueSnackbar, closeSnackbar));
    } else {
      setUploadErr("Please Enter All fields");
    }
  };

  const onChangeHandler = useCallback((name, value) => {
    setUploadErr("");
    setinputvalues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const fileHanlder = (e) => {
    setisloading(true);
    const files = Array.from(e.target.files);
    let imgs = [];
    files.forEach((v) => {
      const storageRef = firebase
        .storage()
        .ref(`${v.name + Math.random().toFixed(30)}`)
        .put(v);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          setUplodadedValue(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          setUploadErr(error.message);
        },
        () => {
          setUplodadedValue(100);
          storageRef.snapshot.ref
            .getDownloadURL()
            .then((url) => {
              imgs = [...imgs, url];
            })
            .catch((e) => {
              setUploadErr("Something went wrong..");
            })
            .finally(() => {
              setImages([...Images, ...imgs]);
              setisloading(false);
            });
        }
      );
    });
  };

  const dragover = (toIndex) => {
    let arr = [];
    var element = Images[drgitemindex];
    arr = Images.splice(drgitemindex, 1);
    arr = Images.splice(toIndex, 0, element);
    setImages([...Images, ...arr]);
  };

  return (
    <div style={{ paddingLeft: "10px" }}>
      <form ref={frm} onSubmit={submit}>
        <Grid container spacing="20px">
          {inputs.map((v, i) => (
            <Grid md={12} sm={12} key={i} item xs={12}>
              <FormControl>
                {["text", "number"].includes(v.type) && (
                  <TextField
                    name={v.name}
                    id={v.id}
                    type={v.type}
                    placeholder={v.placeholder}
                    onChange={(e) => onChangeHandler(v.name, e.target.value)}
                    label={v.name.charAt(0).toUpperCase() + v.name.slice(1)}
                    variant="outlined"
                  />
                )}
              </FormControl>
              <Grid item md={3} sm={6} xs={6}>
                {v.type === "select" && (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Product Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Category"
                      fullWidth
                      value={inputvalues.category}
                      onChange={(e) => onChangeHandler(v.name, e.target.value)}
                    >
                      {v.options.map((val, idx) => (
                        <MenuItem key={idx} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Grid>
            </Grid>
          ))}
          <input
            type="file"
            multiple
            minLength={1}
            onChange={fileHanlder}
          />
          <br />
          <Grid md={12} sm={12} item xs={12}>
            {isloading && <CircularProgress />}
            <br />
            <div style={{ flexDirection: "row", display: "flex" }}>
              {Images.map((v, i) => (
                <div key={i} className="relative img_div">
                  <IconButton
                    style={{ position: "absolute", right: 0, zIndex: 5 }}
                    onClick={() => setImages(Images.filter((vl) => vl != v))}
                  >
                    <Close color="secondary" fontSize="medium" />{" "}
                  </IconButton>
                  <Image
                    src={v}
                    className="images"
                    draggable
                    onDrag={() => setDrgitemindex(i)}
                    onDragEnter={() => i !== drgitemindex && dragover(i)}
                    alt="Picture of the author"
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          </Grid>
          <p>{uploadErr}</p>
          <Button type="submit" disabled={isloading} variant="contained">
            SUBMIT
          </Button>
        </Grid>
      </form>
    </div>
  );
}

export default withAuth(withSnackbar(CreateProduct));
