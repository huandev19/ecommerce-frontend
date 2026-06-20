"use client";

import { useState } from "react";
import { Plus, Search, Edit, Power, Trash2, Zap } from "lucide-react";
import { useAdminWorkflows, useDeleteWorkflow, useToggleWorkflowStatus } from "@v8n/api";
import { Workflow } from "@v8n/types";

import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { Badge } from "@ui/components/ui/badge";
import { Card, CardContent } from "@ui/components/ui/card";
import { WorkflowForm } from "./WorkflowForm";

export function WorkflowsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);

  const { data, isLoading, isError } = useAdminWorkflows();
  const deleteMutation = useDeleteWorkflow();
  const toggleMutation = useToggleWorkflowStatus();

  const handleCreate = () => {
    setEditingWorkflow(null);
    setIsFormOpen(true);
  };

  const handleEdit = (workflow: Workflow) => {
    setEditingWorkflow(workflow);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this workflow?")) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error("Failed to delete workflow", error);
      }
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleMutation.mutateAsync(id);
    } catch (error) {
      console.error("Failed to toggle workflow status", error);
    }
  };

  const filteredWorkflows = data?.workflows.filter((workflow) =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Workflows</h2>
          <p className="text-sm text-gray-500">Automate your store operations</p>
        </div>
        <Button onClick={handleCreate} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" /> Create Workflow
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search workflows..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-48 bg-gray-100" />
          ))}
        </div>
      )}

      {isError && (
        <div className="p-8 text-center border rounded-lg bg-red-50">
          <p className="text-red-600 mb-4">Failed to load workflows.</p>
        </div>
      )}

      {!isLoading && !isError && filteredWorkflows.length === 0 && (
        <div className="p-12 text-center border border-dashed rounded-lg">
          <Zap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No workflows found</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first automated workflow.</p>
          <Button onClick={handleCreate} variant="outline">
            <Plus className="w-4 h-4 mr-2" /> Create Workflow
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkflows.map((workflow) => (
          <Card key={workflow.id} className="flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg text-gray-900">{workflow.name}</h3>
                  <Badge
                    className={
                      workflow.status === 'active'
                        ? "bg-[#D1FAE5] text-[#065F46] border-[#10B981]"
                        : "bg-[#F3F4F6] text-[#6B7280] border-[#D1D5DB]"
                    }
                    variant="outline"
                  >
                    {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex -mr-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(workflow)}>
                    <Edit className="w-4 h-4 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleToggle(workflow.id)}>
                    <Power className={`w-4 h-4 ${workflow.status === 'active' ? 'text-green-600' : 'text-gray-400'}`} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(workflow.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-6 flex-1">
                {workflow.description}
              </p>

              <div className="text-xs text-gray-400 space-y-2 mt-auto pt-4 border-t">
                <div className="flex justify-between">
                  <span>Trigger:</span>
                  <span className="font-medium text-gray-600">{workflow.triggerType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last run:</span>
                  <span className="font-medium text-gray-600">
                    {workflow.lastRun ? new Date(workflow.lastRun).toLocaleDateString() : 'Never'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <WorkflowForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        workflow={editingWorkflow}
      />
    </div>
  );
}
