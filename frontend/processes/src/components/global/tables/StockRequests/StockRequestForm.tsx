import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { StockRequest } from "@/utils/types/stock-request";
import { Role } from "@/utils/types/role";

interface StockRequestFormProps {
  onSubmit: (data: StockRequest) => void;
  onClose: () => void;
}

const StockRequestForm: React.FC<StockRequestFormProps> = ({
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<StockRequest>({
    id: "",
    requestId: "",
    requestDate: "",
    requestNo: "",
    requestReceiveDate: "",
    requestWarehouseId: "",
    requestComplete: false,
    useDate: "",
    stockPoId: "",
    hosGuid: "",
    budgetYear: 0,
    stockSubject: "",
    stockSubjectPerson: "",
    supplierId: "",
    departmentId: "",
    note: "",
    transportDay: 0,
    budgetId: "",
    runNumber: 0,
    numberYear: 0,
    numberMonth: 1,
    stockRequestDocId: "",
    projectId: "",
    stockUserApprove: { stockUserApproveName: "", id: "" },
    stockApproveDate: "",
    stockUser: {
      stockUserName: "",
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      role: [Role.USER],
      id: "",
    },
    stockRequestDocumentId: "",
    projectPlanId: "",
    requestAllComplete: false,
    budgetRunNo: "",
    approve: false,
    requestTagNo: "",
    requestTime: "",
    purchaseType: "",
    stockBudgetTotal: 0,
    stockBudgetUse: 0,
    stockBudgetRemain: 0,
    trimester: 0,
    vatPercent: 0,
    requestReason: "",
    requestTotalPrice: 0,
    requestItemCount: 0,
    stockBudgetPrUse: 0,
    stockBudgetPrRemain: 0,
    officerList: "",
    stockPoNoList: "",
    stockBudgetTypeId: 0,
    depRequestNoList: "",
    camundaTaskId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          width: 600,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h2>Stock Request Form</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Request ID"
            fullWidth
            variant="outlined"
            margin="normal"
            name="requestId"
            value={formData.requestId}
            onChange={handleChange}
          />
          <TextField
            label="Request Date"
            fullWidth
            type="date"
            variant="outlined"
            margin="normal"
            name="requestDate"
            value={formData.requestDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Request No"
            fullWidth
            variant="outlined"
            margin="normal"
            name="requestNo"
            value={formData.requestNo}
            onChange={handleChange}
          />
          <TextField
            label="Request Receive Date"
            fullWidth
            type="date"
            variant="outlined"
            margin="normal"
            name="requestReceiveDate"
            value={formData.requestReceiveDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Request Warehouse ID"
            fullWidth
            variant="outlined"
            margin="normal"
            name="requestWarehouseId"
            value={formData.requestWarehouseId}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="requestComplete"
                checked={formData.requestComplete}
                onChange={handleChange}
              />
            }
            label="Request Complete"
          />
          <TextField
            label="Use Date"
            fullWidth
            type="date"
            variant="outlined"
            margin="normal"
            name="useDate"
            value={formData.useDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Stock PO ID"
            fullWidth
            variant="outlined"
            margin="normal"
            name="stockPoId"
            value={formData.stockPoId}
            onChange={handleChange}
          />
          <TextField
            label="Hospital GUID"
            fullWidth
            variant="outlined"
            margin="normal"
            name="hosGuid"
            value={formData.hosGuid}
            onChange={handleChange}
          />
          <TextField
            label="Budget Year"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="budgetYear"
            value={formData.budgetYear}
            onChange={handleChange}
          />
          <TextField
            label="Stock Subject"
            fullWidth
            variant="outlined"
            margin="normal"
            name="stockSubject"
            value={formData.stockSubject}
            onChange={handleChange}
          />
          <TextField
            label="Stock Subject Person"
            fullWidth
            variant="outlined"
            margin="normal"
            name="stockSubjectPerson"
            value={formData.stockSubjectPerson}
            onChange={handleChange}
          />
          <TextField
            label="Supplier ID"
            fullWidth
            variant="outlined"
            margin="normal"
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
          />
          <TextField
            label="Department ID"
            fullWidth
            variant="outlined"
            margin="normal"
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
          />
          <TextField
            label="Note"
            fullWidth
            variant="outlined"
            margin="normal"
            name="note"
            value={formData.note}
            onChange={handleChange}
          />
          <TextField
            label="Transport Day"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="transportDay"
            value={formData.transportDay}
            onChange={handleChange}
          />
          <TextField
            label="Budget ID"
            fullWidth
            variant="outlined"
            margin="normal"
            name="budgetId"
            value={formData.budgetId}
            onChange={handleChange}
          />
          <TextField
            label="Run Number"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="runNumber"
            value={formData.runNumber}
            onChange={handleChange}
          />
          <TextField
            label="Number Year"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="numberYear"
            value={formData.numberYear}
            onChange={handleChange}
          />
          <TextField
            label="Number Month"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="numberMonth"
            value={formData.numberMonth}
            onChange={handleChange}
          />
          <TextField
            label="Stock Request Doc ID"
            fullWidth
            variant="outlined"
            margin="normal"
            name="stockRequestDocId"
            value={formData.stockRequestDocId}
            onChange={handleChange}
          />
          <TextField
            label="Project ID"
            fullWidth
            variant="outlined"
            margin="normal"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
          />
          <TextField
            label="Stock User Approve ID"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="stockUserApprove"
            value={formData.stockUserApprove.id}
            onChange={handleChange}
          />
          <TextField
            label="Stock Approve Date"
            fullWidth
            type="date"
            variant="outlined"
            margin="normal"
            name="stockApproveDate"
            value={formData.stockApproveDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Stock User ID"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="stockUser"
            value={formData.stockUser.id}
            onChange={handleChange}
          />
          <TextField
            label="Stock Request Document ID"
            fullWidth
            variant="outlined"
            margin="normal"
            name="stockRequestDocumentId"
            value={formData.stockRequestDocumentId}
            onChange={handleChange}
          />
          <TextField
            label="Project Plan ID"
            fullWidth
            variant="outlined"
            margin="normal"
            name="projectPlanId"
            value={formData.projectPlanId}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="requestAllComplete"
                checked={formData.requestAllComplete}
                onChange={handleChange}
              />
            }
            label="Request All Complete"
          />
          <TextField
            label="Budget Run No"
            fullWidth
            variant="outlined"
            margin="normal"
            name="budgetRunNo"
            value={formData.budgetRunNo}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="approve"
                checked={formData.approve}
                onChange={handleChange}
              />
            }
            label="Approve"
          />
          <TextField
            label="Request Tag No"
            fullWidth
            variant="outlined"
            margin="normal"
            name="requestTagNo"
            value={formData.requestTagNo}
            onChange={handleChange}
          />
          <TextField
            label="Request Time"
            fullWidth
            variant="outlined"
            margin="normal"
            name="requestTime"
            value={formData.requestTime}
            onChange={handleChange}
          />
          <TextField
            label="Purchase Type"
            fullWidth
            variant="outlined"
            margin="normal"
            name="purchaseType"
            value={formData.purchaseType}
            onChange={handleChange}
          />
          <TextField
            label="Stock Budget Total"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="stockBudgetTotal"
            value={formData.stockBudgetTotal}
            onChange={handleChange}
          />
          <TextField
            label="Stock Budget Use"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="stockBudgetUse"
            value={formData.stockBudgetUse}
            onChange={handleChange}
          />
          <TextField
            label="Stock Budget Remain"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="stockBudgetRemain"
            value={formData.stockBudgetRemain}
            onChange={handleChange}
          />
          <TextField
            label="Trimester"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="trimester"
            value={formData.trimester}
            onChange={handleChange}
          />
          <TextField
            label="VAT Percent"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="vatPercent"
            value={formData.vatPercent}
            onChange={handleChange}
          />
          <TextField
            label="Request Reason"
            fullWidth
            variant="outlined"
            margin="normal"
            name="requestReason"
            value={formData.requestReason}
            onChange={handleChange}
          />
          <TextField
            label="Request Total Price"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="requestTotalPrice"
            value={formData.requestTotalPrice}
            onChange={handleChange}
          />
          <TextField
            label="Request Item Count"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="requestItemCount"
            value={formData.requestItemCount}
            onChange={handleChange}
          />
          <TextField
            label="Stock Budget Pr Use"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="stockBudgetPrUse"
            value={formData.stockBudgetPrUse}
            onChange={handleChange}
          />
          <TextField
            label="Stock Budget Pr Remain"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="stockBudgetPrRemain"
            value={formData.stockBudgetPrRemain}
            onChange={handleChange}
          />
          <TextField
            label="Officer List"
            fullWidth
            variant="outlined"
            margin="normal"
            name="officerList"
            value={formData.officerList}
            onChange={handleChange}
          />
          <TextField
            label="Stock PO No List"
            fullWidth
            variant="outlined"
            margin="normal"
            name="stockPoNoList"
            value={formData.stockPoNoList}
            onChange={handleChange}
          />
          <TextField
            label="Stock Budget Type ID"
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            name="stockBudgetTypeId"
            value={formData.stockBudgetTypeId}
            onChange={handleChange}
          />
          <TextField
            label="Dep Request No List"
            fullWidth
            variant="outlined"
            margin="normal"
            name="depRequestNoList"
            value={formData.depRequestNoList}
            onChange={handleChange}
          />
          <TextField
            label="Camunda Task ID"
            fullWidth
            variant="outlined"
            margin="normal"
            name="camundaTaskId"
            value={formData.camundaTaskId}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default StockRequestForm;
