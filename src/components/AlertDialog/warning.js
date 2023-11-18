import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AlertWarning({
  openAlertWarning,
  handleCloseAlertWarning,
  description,
}) {
  return (
    <>
      <Snackbar
        open={openAlertWarning}
        autoHideDuration={2000}
        onClose={handleCloseAlertWarning}
      >
        <Alert severity="warning" onClose={handleCloseAlertWarning}>
          {description}
        </Alert>
      </Snackbar>
    </>
  );
}
