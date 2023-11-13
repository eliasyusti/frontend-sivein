import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AlertSuccess({
  openAlertSuccess,
  handleCloseAlertSuccess,
  description,
}) {
  return (
    <>
      <Snackbar
        open={openAlertSuccess}
        autoHideDuration={2000}
        onClose={handleCloseAlertSuccess}
      >
        <Alert severity="success" onClose={handleCloseAlertSuccess}>
          {description}
        </Alert>
      </Snackbar>
    </>
  );
}
