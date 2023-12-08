import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const getValue = (key, value) => value[key];

export const AddressForm = ({ values, handleChange }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Cliente
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="rut"
            name="rut"
            label="RUT"
            onChange={handleChange("rut")}
            value={getValue("rut", values)}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Correo Electronico"
            onChange={handleChange("email")}
            value={getValue("email", values)}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="numberPhone"
            name="numberPhone"
            label="Numero de Telefono"
            onChange={handleChange("numberPhone")}
            value={getValue("numberPhone", values)}
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
