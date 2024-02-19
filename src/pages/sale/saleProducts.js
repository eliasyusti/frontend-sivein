import React from "react";
import CustomizedDialogs from "./modalSale/modalSale";
import SalesTable from "./salesTable/getSalesDetails";
export default function SaleProducts() {
  return (
    <>
      <CustomizedDialogs />
      <SalesTable />
    </>
  );
}
