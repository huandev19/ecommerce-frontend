export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  triggerType: 'order_status_change' | 'low_stock_alert' | 'new_user_welcome' | 'custom';
  lastRun?: string;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowCondition {
  field: string;
  operator: string;
  value: string;
}

export interface WorkflowAction {
  type: string;
  config: Record<string, string>;
}

export interface WorkflowFormData {
  name: string;
  description: string;
  status: 'active' | 'inactive';
  triggerType: Workflow['triggerType'];
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
}

export interface WorkflowsResponse {
  workflows: Workflow[];
  total: number;
}
