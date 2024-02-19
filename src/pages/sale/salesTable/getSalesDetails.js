import React, { useCallback, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { getListSales, getSaleById } from "../../../actions/salesActions";
import { Visibility } from "@material-ui/icons";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Tooltip,
} from "@material-ui/core";
import ViewSaleDetail from "./viewSale";
export default function SalesTable() {
  const [open, setOpen] = React.useState(false);
  const [hasSales, setHasSales] = React.useState(false);
  const [selectedSale, setSelectedSale] = React.useState(null);

  const dispatch = useDispatch();

  const salesData = useCallback(async () => {
    await dispatch(getListSales());
  }, [dispatch]);

  useEffect(() => {
    salesData();
  }, [salesData]);

  const Sales = useSelector((state) => state.Sales);

  const handleClickOpen = async (saleId) => {
    setOpen(true);
    const sale = await dispatch(getSaleById(saleId));
    setSelectedSale(sale);
  };

  useEffect(() => {
    setHasSales(Sales.length === 0);
  }, [Sales]);

  const datas = Sales.map((sales) => ({
    id: sales?.id,
    createdAt: new Date(sales?.createdAt).toLocaleDateString("es-ES"),
    paymentMethod: sales?.paymentMethod,
    name: sales?.customer?.name,
    rut: sales?.customer?.rut,
  }));

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      name: "id",
      label: "ID DE LA VENTA",
    },
    {
      name: "createdAt",
      label: "FECHA",
    },
    {
      name: "paymentMethod",
      label: "METODO DE PAGO",
    },
    {
      name: "rut",
      label: "RUT",
    },
    {
      name: "name",
      label: "NOMBRE DEL CLIENTE",
    },
    {
      name: "ACCIONES",
      options: {
        filter: false,
        viewColumns: false,
        download: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <Tooltip title="Ver">
              <Button
                onClick={() => {
                  handleClickOpen(tableMeta.rowData[0]);
                  console.log(tableMeta.rowData[0]);
                }}
              >
                <Visibility />
              </Button>
            </Tooltip>
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
      <Grid item xs={12}>
        {hasSales ? (
          <p>No hay productos en stock para mostrar.</p>
        ) : (
          <MUIDataTable data={datas} columns={columns} options={options} />
        )}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          {selectedSale && <ViewSaleDetail sale={selectedSale} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
