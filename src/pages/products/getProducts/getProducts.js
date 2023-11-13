import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProducts,
  getListProducts,
} from "../../../actions/productActions";
import { Grid, Button, ButtonGroup } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Edit, Delete } from "@material-ui/icons";
import CreateProducts from "../createProducts/createProducts";
import AlertDialog from "../../../components/AlertDialog";
import AlertSuccess from "../../../components/AlertDialog/success";

export default function DenseTable() {
  const [open, setOpen] = React.useState(false);
  const [valuesForEdit, setValuesForEdit] = React.useState({});
  const [openAlertDelete, setOpenAlertDelete] = React.useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = React.useState(false);
  const [productId, setProductId] = React.useState(null);
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

  const handleClickOpenAlertDelete = () => {
    setOpenAlertDelete(true);
  };
  const handleCloseAlertDelete = () => {
    setOpenAlertDelete(false);
    setProductId(null);
  };

  const handleConfirmDelete = async () => {
    await dispatch(deleteProducts(productId[0]));
    handleCloseAlertDelete();
    productsData();
    handleOpenAlertSuccess();
  };

  const handleClickDelete = async (id) => {
    setProductId(id);
    handleClickOpenAlertDelete();
  };

  const handleOpenAlertSuccess = async () => {
    setOpenAlertSuccess(true);
  };
  const handleCloseAlertSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertSuccess(false);
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
        download: false,
        sort: false,
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
          return (
            <ButtonGroup variant="text" aria-label="text button group">
              <Button
                onClick={() => {
                  handleEditProducts(tableMeta.rowData);
                }}
              >
                <Edit />
              </Button>
              <Button onClick={() => handleClickDelete(tableMeta.rowData)}>
                <Delete />
              </Button>
            </ButtonGroup>
          );
        },
      },
    },
  ];
  const options = {
    filter: true,
    selectableRows: "none",
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
          handleOpenAlertSuccess={handleOpenAlertSuccess}
        />
        <AlertSuccess
          openAlertSuccess={openAlertSuccess}
          handleCloseAlertSuccess={handleCloseAlertSuccess}
          description={"Accion realizada con exito"}
        />
        <AlertDialog
          title="Eliminar producto"
          description="¿Esta seguro que desea eliminar este producto?"
          open={openAlertDelete}
          handleClose={handleCloseAlertDelete}
          textAcept="Si"
          textCancel="No"
          handleCancel={handleCloseAlertDelete}
          handleAcept={handleConfirmDelete}
        />
      </Grid>
    </>
  );
}
