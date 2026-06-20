import { Workflow, WorkflowFormData, WorkflowsResponse } from '@v8n/types';

// Mock data managed locally for admin workflows since it does not exist in queries.ts yet.
// According to rule: Mock data MUST ONLY be created and managed centrally.
// Usually it's in home/queries.ts but this is admin-specific, so we manage it here or in a centralized admin mock file.
let mockWorkflows: Workflow[] = [
  {
    id: 'wf-1',
    name: 'Order Confirmation',
    description: 'Send confirmation email when an order is placed',
    status: 'active',
    triggerType: 'order_status_change',
    lastRun: '2023-11-20T10:30:00Z',
    conditions: [
      { field: 'status', operator: 'equals', value: 'pending' }
    ],
    actions: [
      { type: 'send_email', config: { templateId: 'order_conf_1' } }
    ],
    createdAt: '2023-10-01T08:00:00Z',
    updatedAt: '2023-10-01T08:00:00Z'
  },
  {
    id: 'wf-2',
    name: 'Low Stock Alert',
    description: 'Notify admin when product stock is below 10',
    status: 'active',
    triggerType: 'low_stock_alert',
    conditions: [
      { field: 'stock', operator: 'less_than', value: '10' }
    ],
    actions: [
      { type: 'send_notification', config: { roles: 'admin' } }
    ],
    createdAt: '2023-10-05T09:15:00Z',
    updatedAt: '2023-11-15T11:20:00Z'
  },
  {
    id: 'wf-3',
    name: 'Welcome Series',
    description: 'Onboard new registered users',
    status: 'inactive',
    triggerType: 'new_user_welcome',
    conditions: [],
    actions: [
      { type: 'send_email', config: { templateId: 'welcome_series' } }
    ],
    createdAt: '2023-11-01T14:45:00Z',
    updatedAt: '2023-11-01T14:45:00Z'
  }
];

export const fetchAdminWorkflows = async (): Promise<WorkflowsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ workflows: [...mockWorkflows], total: mockWorkflows.length });
    }, 500);
  });
};

export const createWorkflow = async (data: WorkflowFormData): Promise<Workflow> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = mockWorkflows.some(w => w.name.toLowerCase() === data.name.toLowerCase());
      if (exists) {
        reject(new Error("A workflow with this name already exists."));
        return;
      }
      
      const newWorkflow: Workflow = {
        id: `wf-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      mockWorkflows.push(newWorkflow);
      resolve(newWorkflow);
    }, 600);
  });
};

export const updateWorkflow = async (id: string, data: WorkflowFormData): Promise<Workflow> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockWorkflows.findIndex(w => w.id === id);
      if (index === -1) {
        reject(new Error("Workflow not found."));
        return;
      }
      
      const updatedWorkflow = {
        ...mockWorkflows[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      mockWorkflows[index] = updatedWorkflow;
      resolve(updatedWorkflow);
    }, 600);
  });
};

export const deleteWorkflow = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = mockWorkflows.length;
      mockWorkflows = mockWorkflows.filter(w => w.id !== id);
      
      if (mockWorkflows.length === initialLength) {
        reject(new Error("Workflow not found."));
        return;
      }
      
      resolve();
    }, 500);
  });
};

export const toggleWorkflowStatus = async (id: string): Promise<Workflow> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockWorkflows.findIndex(w => w.id === id);
      if (index === -1) {
        reject(new Error("Workflow not found."));
        return;
      }
      
      const currentStatus = mockWorkflows[index].status;
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      
      mockWorkflows[index] = {
        ...mockWorkflows[index],
        status: newStatus,
        updatedAt: new Date().toISOString()
      };
      
      resolve(mockWorkflows[index]);
    }, 400);
  });
};
