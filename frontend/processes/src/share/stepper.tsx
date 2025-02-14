import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { StockRequest } from "@/utils/types/stock-request";

const steps = ["Approver", "Director", "Finished"];

export default function HorizontalLinearAlternativeLabelStepper({
  stockRequest,
}: {
  stockRequest: StockRequest;
}) {
  const getActiveStep = () => {
    if (stockRequest.requestComplete !== true) {
      return 0; // ขั้นตอนแรก 'Examine'
    } else if (stockRequest.stockApproveDate != null) {
      return 1; // ขั้นตอนที่สอง 'Approve'
    } else {
      return 2; // ขั้นตอนสุดท้าย 'Finished'
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={getActiveStep()} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
