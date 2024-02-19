import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Checkout from "../checkout/checkout";
import { SaleContextProvider } from "../../../context/saleContext";
import { Grid, Tooltip } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    maxWidth: "200%",
  },
}));

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Tooltip title="Agregar venta">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleClickOpen();
            }}
          >
            <AddShoppingCartIcon />
          </Button>
        </Tooltip>
      </Grid>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <SaleContextProvider>
            <Checkout />
          </SaleContextProvider>
        </DialogContent>
      </BootstrapDialog>
    </Grid>
  );
}
