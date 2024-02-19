import React, { useCallback, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { getSaleDetailById } from "../../../actions/saleDetailActions";
import { SaleContext } from "../../../context/saleContext";

export default function Review({ paymentMethod }) {
  const dispatch = useDispatch();
  const { saleId } = useContext(SaleContext);
  const { customer } = useContext(SaleContext);

  const saleDetailData = useCallback(async () => {
    await dispatch(getSaleDetailById(saleId));
  }, [dispatch, saleId]);
  useEffect(() => {
    saleDetailData();
  }, [saleDetailData]);

  const SaleDetail = useSelector((state) => state.SaleDetail || []);
  const dataSale = SaleDetail?.details || [];
  const totalToPay = SaleDetail?.totalToPay || 0;
  const data = dataSale.map((item) => ({
    id: item?.id,
    name: item?.product?.name,
    product: item?.product?.id,
    price: item?.product?.price,
    quantity: item?.quantity,
    sales: item?.sales?.id,
    subTotal: item?.subTotal,
  }));

  const payments = [
    { name: "ID de la venta", detail: `#${saleId}` },
    { name: "Tipo de Pago", detail: paymentMethod },
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
            {data.map((product) => (
              <ListItem
                key={product.name}
                sx={{
                  py: 1,
                  px: 0,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <ListItemText
                  primary={product.name}
                  secondary={`${product.price}$`}
                />
                <ListItemText
                  sx={{
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  primary={`x${product.quantity}`}
                />
                <Typography variant="body2">{product.subTotal}$</Typography>
              </ListItem>
            ))}
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {totalToPay}$
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Datos del Cliente
          </Typography>
          <Typography gutterBottom>{customer.name}</Typography>
          <Typography gutterBottom>{customer.email},</Typography>
          <Typography gutterBottom>{customer.numberPhone},</Typography>
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
