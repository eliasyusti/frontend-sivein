import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListProducts } from "../../actions/productActions";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

export default function DenseTable() {
  const dispatch = useDispatch();
  const productsData = useCallback(async () => {
    await dispatch(getListProducts());
  }, [dispatch]);

  useEffect(() => {
    productsData();
  }, [productsData]);

  const Products = useSelector((state) => state.Products);

  const columns = [
    {
      name: "name",
      label: "NOMBRE",
    },
    {
      name: "description",
      label: "DESCRIPCION",
    },
    {
      name: "price",
      label: "PRECIO",
    },
    {
      name: "category",
      label: "CATEGORIA",
    },
  ];
  const options = {
    filter: true,
    selectableRows: false,
  };

  const data = Products.map((product) => ({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
  }));
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button variant="contained" color="primary">
            <AddShoppingCartIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable columns={columns} data={data} options={options} />
        </Grid>
      </Grid>
    </>
  );
}
