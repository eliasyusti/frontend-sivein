import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { FormCreateProducts } from "../createProducts/formCreateProducts";
import { editProducts, postProducts } from "../../../actions/productActions";

const initValues = {
  name: "",
  description: "",
  price: "",
  category: "",
};

const getNewValuesForEdit = (valuesForEdit) => {
  return {
    ...valuesForEdit,
  };
};

export default function CreateProducts({ valuesForEdit, open, handleClose }) {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initValues);

  useEffect(() => {
    if (!isEmpty(valuesForEdit)) {
      const newValuesForEdit = getNewValuesForEdit(valuesForEdit);
      setValues(newValuesForEdit);
      return;
    }
    setValues(initValues);
  }, [valuesForEdit]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSave = async () => {
    const functionActionsCreateEdit = isEmpty(valuesForEdit)
      ? postProducts
      : editProducts;
    await dispatch(functionActionsCreateEdit(values));
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
            <FormCreateProducts handleChange={handleChange} values={values} />
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
