import { Alert, Slide, Snackbar } from "@mui/material";
import React from "react";

const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
};

const SnackbarCustom = ({
  open,
  autoHideDuration = 2000,
  anchorOrigin = { vertical: "top", horizontal: "right" },
  onClose,
  alertText,
  alertVariant = "filled",
  severity = "success",
}) => {
  return (
    <Snackbar
      autoHideDuration={autoHideDuration}
      open={open}
      TransitionComponent={TransitionLeft}
      anchorOrigin={anchorOrigin}
      onClose={onClose}
      key={TransitionLeft ? TransitionLeft.name : ""}
    >
      <Alert
        sx={{ width: "100%" }}
        onClose={onClose}
        severity={severity}
        variant={alertVariant}
      >
        {alertText}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarCustom;
