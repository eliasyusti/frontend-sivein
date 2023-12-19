import React, { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { AddressForm } from "./customerForm";
import PaymentForm from "./salesForm";
import Review from "./salesDetails";
import { editCustomers, postCustomers } from "../../../actions/customerActions";
import { useDispatch } from "react-redux";
import { editSale, postSale } from "../../../actions/salesActions";
import { SaleContext } from "../../../context/saleContext";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = [
  "Detalles del Cliente",
  "Detalle de la Venta",
  "Finalizar Venta",
];

const initValues = {
  rut: "",
  name: "",
  email: "",
  numberPhone: "",
};

export default function Checkout() {
  const { setSaleId } = useContext(SaleContext);
  const { setCustomer } = useContext(SaleContext);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [values, setValues] = React.useState(initValues);
  const [clickCount, setClickCount] = React.useState(0);
  const [valuesForEdit, setValuesForEdit] = React.useState({});
  const [paymentId, setPaymentId] = React.useState({});
  const [paymentMethod, setPaymentMethod] = React.useState("Efectivo");

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm values={values} handleChange={handleChange} />;
      case 1:
        return (
          <PaymentForm
            paymentMethod={paymentMethod}
            handlePaymentMethodChange={handlePaymentMethodChange}
          />
        );
      case 2:
        return <Review paymentMethod={paymentMethod} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = async () => {
    setActiveStep(activeStep + 1);
    setClickCount((prevCount) => prevCount + 1);
    if (activeStep === 0 && clickCount === 0) {
      const newCustomer = await dispatch(postCustomers(values));
      setValuesForEdit({ ...values, id: newCustomer.id });
      const customerId = { customer: newCustomer.id };
      const newSale = await dispatch(postSale(customerId));
      setPaymentId(newSale);
      console.log(paymentId);
      setSaleId(newSale.id);
      setCustomer(newCustomer);
    } else {
      const valueFinal = { ...values, id: String(valuesForEdit.id) };
      await dispatch(editCustomers(valueFinal));
      const method = { paymentMethod: paymentMethod };
      const editPaymentMethod = { ...method, id: paymentId.id };
      await dispatch(editSale(editPaymentMethod));
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      ></AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, maxWidth: "100%" }}
        >
          <Typography component="h1" variant="h4" align="center">
            Venta
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                La venta #{paymentId.id} fue completada con exito!
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Atras
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1
                    ? "Place order"
                    : "Siguiente"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
