import React from "react";
import TextField from "@material-ui/core/TextField";

const getValue = (key, value) => value[key];

export const FormCreateProducts = ({ handleChange, values, errors }) => {
  return (
    <form noValidate autoComplete="off">
      <TextField
        margin="dense"
        onChange={handleChange("name")}
        id="name"
        label="Nombre"
        type="text"
        value={getValue("name", values)}
        fullWidth
        required
        error={errors.name}
        helperText={errors.name && "Este campo no puede estar vacío"}
      />
      <TextField
        margin="dense"
        onChange={handleChange("description")}
        id="description"
        label="Descripcion"
        value={getValue("description", values)}
        type="text"
        fullWidth
        required
        error={errors.description}
        helperText={errors.description && "Este campo no puede estar vacío"}
      />
      <TextField
        margin="dense"
        onChange={handleChange("price")}
        id="price"
        label="Precio"
        value={getValue("price", values)}
        type="number"
        fullWidth
        required
        error={errors.price}
        helperText={errors.price && "Este campo no puede estar vacío"}
      />
      <TextField
        margin="dense"
        onChange={handleChange("category")}
        id="category"
        label="Categoria"
        value={getValue("category", values)}
        type="text"
        fullWidth
        required
        error={errors.category}
        helperText={errors.category && "Este campo no puede estar vacío"}
      />
    </form>
  );
};
