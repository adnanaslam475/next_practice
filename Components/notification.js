import React from "react";
import Slide from "@material-ui/core/Slide";
import { Close } from "@mui/icons-material";

export function notification(...args) {
  const [variant, message, notify, closeSnackbar] = args;
  return notify(message, {
    variant,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    action: function (key) {
      return <Close onClick={() => closeSnackbar(key)} />;
    },
    TransitionComponent: Slide,
  });
}
