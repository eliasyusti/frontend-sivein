import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListProducts } from "../../../actions/productActions";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import EditIcon from "@material-ui/icons/Edit";
import CreateProducts from "../createProducts/createProducts";

export default function DenseTable() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const productsData = useCallback(async () => {
    await dispatch(getListProducts());
  }, [dispatch]);

  useEffect(() => {
    productsData();
  }, [productsData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Products = useSelector((state) => state.Products);

  const data = Products.map((product) => ({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
  }));

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
    {
      name: "ACCIONES",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="contained" color="secondary">
              <EditIcon />
            </Button>
          );
        },
      },
    },
  ];
  const options = {
    filter: true,
    selectableRows: false,
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleClickOpen();
            }}
          >
            <AddShoppingCartIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable columns={columns} data={data} options={options} />
        </Grid>
        <CreateProducts open={open} handleClose={handleClose} />
      </Grid>
    </>
  );
}
