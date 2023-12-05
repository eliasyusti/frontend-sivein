import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { getListProducts } from "../../../actions/productActions";
import { Button, List, ListItem, Paper, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Autocomplete } from "@mui/material";

export default function PaymentForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

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

  const handleSearch = (event, value) => {
    const term = value ? value.toLowerCase() : "";
    setSearchTerm(term);
    const selected = products.find((objeto) => objeto.name === value);
    if (selected) {
      setSelectedObject(selected);
    } else {
      setSelectedObject(null);
    }
  };

  const handleAddToSelected = () => {
    if (selectedObject && selectedQuantity > 0) {
      const newItem = {
        id: selectedObject.id,
        name: selectedObject.name,
        quantity: selectedQuantity,
      };

      setSelectedItems([...selectedItems, newItem]);
      setSelectedObject(null);
      setSearchTerm("");
      setSelectedQuantity(1);
    }
  };

  const handleRemoveItem = (id) => {
    const updatedItems = selectedItems.filter((item) => item.id !== id);
    setSelectedItems(updatedItems);
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
                  variant="outlined"
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
              variant="outlined"
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
          {selectedItems.map((item) => (
            <ListItem key={item.id}>
              {item.name} - Cantidad: {item.quantity}
              <IconButton
                aria-label="Eliminar"
                onClick={() => handleRemoveItem(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}
