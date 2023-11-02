import React from "react";
import { Grid } from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle";

export default function TypographyPage() {
  return (
    <>
      <PageTitle title="Productos" />
      <Grid container spacing={4}></Grid>
    </>
  );
}
