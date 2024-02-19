import React from "react";
//import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
//import { getSaleById } from "../../../actions/salesActions";
import { List, ListItemText } from "@mui/material";
import { ListItem } from "@mui/material";

export default function ViewSaleDetail({ sale }) {
  console.log(sale);

  const totalToPay = sale?.data?.salesDetails.reduce((total, saleDetail) => {
    return total + saleDetail.subTotal;
  }, 0);

  const payments = [
    { name: "ID de la venta", detail: `#${sale?.data?.id}` },
    { name: "Tipo de Pago", detail: sale?.data?.paymentMethod },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detalle total de la Venta
      </Typography>
      <Grid
        container
        justifyContent="space-between"
        spacing={2}
        alignItems="center"
      >
        <Grid item xs={12}>
          <List disablePadding>
            {sale?.data?.salesDetails.map((saleDetail) => (
              <ListItem
                key={saleDetail.id}
                sx={{
                  py: 1,
                  px: 0,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <ListItemText
                  primary={saleDetail.product.name}
                  secondary={`${saleDetail.product.price}$`}
                />
                <ListItemText
                  sx={{
                    alignItems: "center",
                    textAlign: "center",
                    flexBasis: "25%",
                  }}
                  primary={`x${saleDetail.quantity}`}
                />
                <Typography variant="body2">{saleDetail.subTotal}$</Typography>
              </ListItem>
            ))}
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Total a pagar" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {totalToPay}
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Datos del Cliente
          </Typography>
          <Typography gutterBottom>{sale?.data?.customer?.name}</Typography>
          <Typography gutterBottom>{sale?.data?.customer?.email},</Typography>
          <Typography gutterBottom>
            {sale?.data?.customer?.numberPhone},
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: -1.9 }}>
            Detalles del pago
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
