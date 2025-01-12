export interface Task {
    id: string;
    name: string | null;
    assignee: string | null;
    created: string;
    due: string | null;
    priority: number;
    processDefinitionId: string;
    processInstanceId: string;
    taskDefinitionKey: string;
    suspended: boolean;
    taskState: string;
    camundaFormRef: {
      key: string;
      binding: string;
      version: string | null;
    };
  }
  