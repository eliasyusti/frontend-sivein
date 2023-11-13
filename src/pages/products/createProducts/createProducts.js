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

export default function CreateProducts({
  valuesForEdit,
  open,
  handleClose,
  openAlertSuccess,
  handleOpenAlertSuccess,
}) {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = React.useState({
    name: false,
    description: false,
    price: false,
    category: false,
  });

  useEffect(() => {
    if (!isEmpty(valuesForEdit)) {
      const newValuesForEdit = getNewValuesForEdit(valuesForEdit);
      setValues(newValuesForEdit);
      return;
    }
    setValues(initValues);
  }, [valuesForEdit]);

  const handleChange = (fieldName) => (event) => {
    const value = event.target.value;
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: value.trim() === "",
    }));
  };

  const handleSave = async () => {
    const hasEmptyFields = Object.values(values).some(
      (value) => value.trim() === "",
    );
    if (hasEmptyFields) {
      console.log("Hay campos vacíos. No se puede guardar.");
      return;
    }
    const functionActionsCreateEdit = isEmpty(valuesForEdit)
      ? postProducts
      : editProducts;
    await dispatch(functionActionsCreateEdit(values));
    setValues(initValues);
    handleClose();
    handleOpenAlertSuccess();
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
            <FormCreateProducts
              handleChange={handleChange}
              values={values}
              errors={errors}
            />
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
