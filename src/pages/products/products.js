import React from "react";
import { Grid } from "@material-ui/core";
import DenseTable from "./tableProducts";

// components
import PageTitle from "../../components/PageTitle";

export default function Products() {
  return (
    <>
      <PageTitle title="Productos" />
      <Grid container spacing={4}>
        <DenseTable />
      </Grid>
    </>
  );
}
