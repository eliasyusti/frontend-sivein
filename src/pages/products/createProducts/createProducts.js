import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { FormCreateProducts } from "../createProducts/formCreateProducts";
import { editProducts, postProducts } from "../../../actions/productActions";
import AlertWarning from "../../../components/AlertDialog/warning";

const initValues = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "",
};

const valueForErrors = {
  name: false,
  description: false,
  price: false,
  stock: false,
  category: false,
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
  handleOpenAlertSuccess,
}) {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = React.useState({ valueForErrors });
  const [IsErrors, setIsErrors] = React.useState(false);

  useEffect(() => {
    if (!isEmpty(valuesForEdit)) {
      const newValuesForEdit = getNewValuesForEdit(valuesForEdit);
      setValues(newValuesForEdit);
      return;
    }
    setValues(initValues);
  }, [valuesForEdit]);

  const handleCloseAlertWarning = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsErrors(false);
  };

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
    console.log(values);
    const areFieldsEmpty = Object.values(values).some((value) =>
      isEmpty(value),
    );
    if (areFieldsEmpty) {
      setIsErrors(true);
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
          <DialogTitle id="form-dialog-title">DATOS DEL PRODUCTO</DialogTitle>
          <DialogContent>
            {IsErrors && (
              <AlertWarning
                openAlertWarning={IsErrors}
                handleCloseAlertWarning={handleCloseAlertWarning}
                description={"Debes completar todos los campos"}
              />
            )}
            <FormCreateProducts
              handleChange={handleChange}
              values={values}
              errors={errors}
              selectedCategory={valuesForEdit.category}
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
