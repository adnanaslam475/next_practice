import React, { useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import { withSnackbar } from "notistack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch, connect } from "react-redux";
import { checkServerSideCookie, login, reauthenticate } from "../redux/action";
import { wrapper } from "../redux";
import { FormControl } from "@mui/material";

function create_product() {
  const frm = useRef()
  let arr = [{
    name: 'name', id: 'name', type: 'input',
    placeholder: 'Type name...'
  }, {
    name: 'details', id: 'details', type: 'input',
    placeholder: 'Type details...'
  }, {
    name: 'price', id: 'price', type: 'input',
    placeholder: 'Type price...'
  }, {
    name: 'name', id: 'name', type: 'input',
    placeholder: 'Type name...'
  }]
  const submit = e => {


  }
  const onChangeHandlers = e => {

  }

  return <div>
    <form ref={frm} onSubmit={submit} >
    </form>
    {arr.map(v => <FormControl>
      <TextField id="outlined-basic"
        name={v.name} id={v.id} placeholder={v.placeholder}
        onChange={onChangeHandler}
        label="Outlined" variant="outlined" />
    </FormControl>)}
  </div>;
};

export default create_product;
