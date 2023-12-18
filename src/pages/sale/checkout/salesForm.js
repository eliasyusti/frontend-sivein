import React, { useCallback, useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { getListProducts } from "../../../actions/productActions";
import { Button, List, ListItem, Paper, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Autocomplete } from "@mui/material";
import { SaleContext } from "../../../context/saleContext";
import {
  deleteSaleDetail,
  getSaleDetailById,
  postSaleDetail,
} from "../../../actions/saleDetailActions";

export default function PaymentForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { saleId } = useContext(SaleContext);
  const dispatch = useDispatch();

  const productsData = useCallback(async () => {
    await dispatch(getListProducts());
  }, [dispatch]);
  useEffect(() => {
    productsData();
  }, [productsData, searchTerm]);

  const products = useSelector((state) =>
    state.Products.sort((a, b) => a.name.localeCompare(b.name)),
  );

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

  const handleAddToSelected = async () => {
    if (selectedObject && selectedQuantity > 0) {
      const saleDetail = {
        quantity: selectedQuantity,
        product: { id: selectedObject.id },
        sales: { id: saleId },
      };
      await dispatch(postSaleDetail(saleDetail));
      saleDetailData();
      setSelectedObject(null);
      setSearchTerm("");
      setSelectedQuantity(1);
    }
  };

  const handleRemoveItem = async (id) => {
    await dispatch(deleteSaleDetail(id));
    saleDetailData();
  };

  const handleSearch = (value) => {
    const term = value ? value.toLowerCase() : "";
    setSearchTerm(term);
    const selected = products.find((objeto) => objeto.name === value);
    if (selected) {
      setSelectedObject(selected);
    } else {
      setSelectedObject(null);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detalle de la Venta
      </Typography>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={5}>
            <Autocomplete
              options={products.map((product) => product.name)}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              value={selectedObject ? selectedObject.name : ""}
              onChange={(event, value) => {
                const selected = products.find(
                  (product) => product.name === value,
                );
                setSelectedObject(selected || null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Producto"
                  variant="standard"
                  onChange={(event, value) => handleSearch(event, value)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              required
              type="number"
              id="quantity"
              label="Cantidad"
              fullWidth
              variant="standard"
              value={selectedQuantity}
              onChange={(event) => setSelectedQuantity(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToSelected}
              disabled={!selectedObject}
              style={{ marginTop: "16px" }}
            >
              Agregar
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Lista de Productos Agregados
      </Typography>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <List>
          {data.map((item) => (
            <ListItem key={item.id}>
              Producto: {item.name} - Cantidad: {item.quantity} - Precio
              Unitario: {item.price} - Sub-Total: {item.subTotal}
              <IconButton
                aria-label="Eliminar"
                onClick={() => handleRemoveItem(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h6">Total a Pagar</Typography>
          <Typography variant="h4">${totalToPay.toFixed(2)}</Typography>
        </Paper>
      </Paper>
    </React.Fragment>
  );
}
