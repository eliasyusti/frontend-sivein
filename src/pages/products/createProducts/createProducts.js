import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { FormCreateProducts } from "../createProducts/formCreateProducts";
import { postProducts } from "../../../actions/productActions";

const initValues = {
  name: "",
  description: "",
  price: "",
  category: "",
};

export default function CreateProducts({ open, handleClose }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [values, setValues] = useState(initValues);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSave = () => {
    dispatch(postProducts(values));
    setValues(initValues);
    handleClose();
  };

  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <DialogContentText>AGREGAR UN PRODUCTO NUEVO</DialogContentText>
            <FormCreateProducts handleChange={handleChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSave} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
