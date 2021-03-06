import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { withSnackbar } from "notistack";
import { logout } from "../redux/action";

function Header({ enqueueSnackbar, closeSnackbar }) {
  // const s = useSelector((s) => s.auth);

  let accessToken;
  const dispatch = useDispatch();
  if (typeof window !== "undefined") {
    accessToken = window.document.cookie.split("=")[1];
  }

  return (
    <Box sx={{}} className="header_box">
      <AppBar position="static">
        <Toolbar style={{ alignItems: "center" }}>
          <Link href="/">News App</Link>
          <div
            style={{
              position: "absolute",
              right: "30px",
              display: "flex",
              color: "white",
            }}
          >
            {accessToken ? (
              <div>
                <Button className="link">
                  <Link href="/create_product"> Create </Link>
                </Button>
                <Button
                  onClick={() =>
                    dispatch(logout("token", enqueueSnackbar, closeSnackbar))
                  }
                  className="link"
                >
                  <Link href="/"> Logout</Link>
                </Button>
              </div>
            ) : (
              <div>
                <Button className="link">
                  <Link href="/login"> Login</Link>
                </Button>
                <Button className="link">
                  <Link href="/register"> Register</Link>
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default withSnackbar(Header);
