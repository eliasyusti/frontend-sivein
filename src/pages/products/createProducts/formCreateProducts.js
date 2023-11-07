import React from "react";
import TextField from "@material-ui/core/TextField";

// const getValue = (key, value) => value[key];

export const FormCreateProducts = ({ handleChange }) => {
  return (
    <form noValidate autoComplete="off">
      <TextField
        autoFocus
        margin="dense"
        onChange={handleChange("name")}
        id="name"
        label="Nombre"
        type="text"
        // value={getValue("name", values)}
        fullWidth
      />
      <TextField
        autoFocus
        margin="dense"
        onChange={handleChange("description")}
        id="description"
        label="Descripcion"
        // value={getValue("description", values)}
        type="text"
        fullWidth
      />
      <TextField
        autoFocus
        margin="dense"
        onChange={handleChange("price")}
        id="price"
        label="Precio"
        // value={getValue("price", values)}
        type="text"
        fullWidth
      />
      <TextField
        autoFocus
        margin="dense"
        onChange={handleChange("category")}
        id="category"
        label="Categoria"
        // value={getValue("category", values)}
        type="text"
        fullWidth
      />
    </form>
  );
};
