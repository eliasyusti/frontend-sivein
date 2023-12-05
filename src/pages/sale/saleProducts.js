import React from "react";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
//import HorizontalLinearStepper from "./stepSale/stepSale";
import CustomizedDialogs from "./modalSale/modalSale";
export default function SaleProducts() {
  return (
    <>
      <PageTitle title="Ventas" />
      <CustomizedDialogs />
    </>
  );
}
