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
  const [valuesForEdit, setValuesForEdit] = React.useState({});
  const dispatch = useDispatch();
  const productsData = useCallback(async () => {
    await dispatch(getListProducts());
  }, [dispatch]);

  useEffect(() => {
    productsData();
  }, [productsData]);

  const handleClickOpen = () => {
    setValuesForEdit({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Products = useSelector((state) => state.Products);

  const data = Products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
  }));

  const handleEditProducts = (body) => {
    const [productEdit] = Products.filter((item) => item.id === body[0]);
    // console.log(body, "body");
    // console.log(productEdit, "productEdit");
    setValuesForEdit({
      id: productEdit.id,
      name: body[1],
      description: body[2],
      price: body[3],
      category: body[4],
    });
    setOpen(true);
  };

  const columns = [
    {
      name: "id",
      options: {
        print: false,
        display: false,
        viewColumns: false,
        filter: false,
      },
    },
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
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(tableMeta);
          return (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleEditProducts(tableMeta.rowData);
              }}
            >
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
        <CreateProducts
          valuesForEdit={valuesForEdit}
          open={open}
          handleClose={handleClose}
        />
      </Grid>
    </>
  );
}
