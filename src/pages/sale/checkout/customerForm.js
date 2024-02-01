import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@material-ui/core";

const getValue = (key, value) => value[key];

export const AddressForm = ({ values, handleChange }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Cliente
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="rut"
            name="rut"
            label="RUT"
            onChange={handleChange("rut")}
            value={getValue("rut", values)}
            fullWidth
            variant="standard"
            inputProps={{
              maxLength: 10,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Nombre y Apellido"
            onChange={handleChange("name")}
            value={getValue("name", values)}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Numero de Telefono"
            id="standard-start-adornment"
            onChange={handleChange("numberPhone")}
            value={getValue("numberPhone", values)}
            fullWidth
            inputProps={{
              maxLength: 8,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+569</InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="email"
            type="email"
            name="email"
            label="Correo Electronico"
            onChange={handleChange("email")}
            value={getValue("email", values)}
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
