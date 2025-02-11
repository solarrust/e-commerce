import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

export default function CheckoutSteps({ current = 0 }) {
  return (
    <div className="wrapper">
      <Stepper activeStep={current}>
        {[
          "User Log In",
          "Shipping Address",
          "Payment Method",
          "Place Order",
        ].map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
