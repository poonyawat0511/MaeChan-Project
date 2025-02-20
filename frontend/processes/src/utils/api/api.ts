export const camundaTaksApiApprover = `http://localhost:8081/engine-rest/task?candidateGroup=Approver`;
export const camundaTaksApiDirector = `http://localhost:8081/engine-rest/task?candidateGroup=Director`;

export const camundaTaskSubmit = `http://localhost:8081/engine-rest/task`;

export const springRequestByTaskApi = (processInstanceId: string) =>
  `http://localhost:8081/spring-requests/task/${processInstanceId}`;

export const requestApi = `http://localhost:8081/stock-requests`;

export const poApi = `http://localhost:8081/stock-po`

export const poDetailApi = `http://localhost:8081/stock-po-details`

export const itemsApi = `http://localhost:8081/stock-items`

export const warehouseApi = `http://localhost:8081/stock-warehouse`
