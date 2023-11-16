import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCategories } from "../../../actions/categoryActions";
import TextField from "@material-ui/core/TextField";

const getValue = (key, value) => value[key];

export const FormCreateProducts = ({
  handleChange,
  values,
  errors,
  selectedCategory,
}) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");
  const categoryData = useCallback(async () => {
    await dispatch(getListCategories());
  }, [dispatch]);
  useEffect(() => {
    categoryData();
  }, [categoryData]);

  useEffect(() => {
    setSelectedOption(selectedCategory);
  }, [selectedCategory]);

  const category = useSelector((state) => state.Category);
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
        onChange={handleChange("stock")}
        id="stock"
        label="Stock"
        value={getValue("stock", values)}
        type="number"
        fullWidth
        required
        error={errors.stock}
        helperText={errors.stock && "Este campo no puede estar vacío"}
      />
      <TextField
        id="category"
        select
        margin="dense"
        fullWidth
        onChange={(e) => {
          setSelectedOption(e.target.value);
          handleChange("category")(e);
        }}
        value={selectedOption}
        SelectProps={{
          native: true,
        }}
      >
        <option key="initcategory" value="">
          Seleccione una categoria
        </option>
        {category.map((option) => (
          <option
            key={option.id}
            value={option ? option.id : option.id === selectedCategory}
          >
            {option.name}
          </option>
        ))}
      </TextField>
    </form>
  );
};
