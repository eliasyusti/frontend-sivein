import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { FormCreateProducts } from "../createProducts/formCreateProducts";

const initValues = {
  name: "",
  description: "",
  price: "",
  category: "",
};

export default function CreateProducts({ open, handleClose }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [values, setValues] = useState(initValues);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
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
            <Button onClick={handleClose} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
