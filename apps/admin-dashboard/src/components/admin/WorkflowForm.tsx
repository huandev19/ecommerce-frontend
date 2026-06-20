"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2 } from "lucide-react";
import { Workflow, WorkflowFormData } from "@v8n/types";
import { useCreateWorkflow, useUpdateWorkflow } from "@v8n/api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@ui/components/ui/dialog";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { Textarea } from "@ui/components/ui/textarea";
import { Switch } from "@ui/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Select } from "@ui/components/ui/select";
import { Card, CardContent } from "@ui/components/ui/card";

export const workflowSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().min(1, 'Description is required').max(500),
  status: z.enum(['active', 'inactive']),
  triggerType: z.enum(['order_status_change', 'low_stock_alert', 'new_user_welcome', 'custom']),
  conditions: z.array(z.object({
    field: z.string().min(1, "Field is required"),
    operator: z.string().min(1, "Operator is required"),
    value: z.string().min(1, "Value is required"),
  })).min(1, 'At least one condition is required'),
  actions: z.array(z.object({
    type: z.string().min(1, "Action type is required"),
    config: z.record(z.string()),
  })).min(1, 'At least one action is required'),
});

interface WorkflowFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflow?: Workflow | null;
}

export function WorkflowForm({ open, onOpenChange, workflow }: WorkflowFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createMutation = useCreateWorkflow();
  const updateMutation = useUpdateWorkflow();

  const form = useForm<z.infer<typeof workflowSchema>>({
    resolver: zodResolver(workflowSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "active",
      triggerType: "order_status_change",
      conditions: [{ field: "", operator: "", value: "" }],
      actions: [{ type: "", config: {} }],
    },
  });

  const { fields: conditionFields, append: appendCondition, remove: removeCondition } = useFieldArray({
    control: form.control,
    name: "conditions",
  });

  const { fields: actionFields, append: appendAction, remove: removeAction } = useFieldArray({
    control: form.control,
    name: "actions",
  });

  useEffect(() => {
    if (workflow && open) {
      form.reset({
        name: workflow.name,
        description: workflow.description,
        status: workflow.status,
        triggerType: workflow.triggerType,
        conditions: workflow.conditions.length ? workflow.conditions : [{ field: "", operator: "", value: "" }],
        actions: workflow.actions.length ? workflow.actions : [{ type: "", config: {} }],
      });
    } else if (open && !workflow) {
      form.reset({
        name: "",
        description: "",
        status: "active",
        triggerType: "order_status_change",
        conditions: [{ field: "", operator: "", value: "" }],
        actions: [{ type: "", config: {} }],
      });
    }
  }, [workflow, open, form]);

  const onSubmit = async (data: z.infer<typeof workflowSchema>) => {
    setIsSubmitting(true);
    try {
      if (workflow) {
        await updateMutation.mutateAsync({ id: workflow.id, data: data as WorkflowFormData });
      } else {
        await createMutation.mutateAsync(data as WorkflowFormData);
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save workflow:", error);
      // Here you would show a toast error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{workflow ? "Edit Workflow" : "Create Workflow"}</DialogTitle>
          <DialogDescription>
            {workflow ? "Modify existing workflow rules and actions." : "Configure a new automated workflow."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workflow Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Order Confirmation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="triggerType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trigger Type</FormLabel>
                    <Select value={field.value} onChange={(e) => field.onChange(e.target.value)}>
                      <option value="order_status_change">Order Status Change</option>
                      <option value="low_stock_alert">Low Stock Alert</option>
                      <option value="new_user_welcome">New User Welcome</option>
                      <option value="custom">Custom Event</option>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What does this workflow do?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Status</FormLabel>
                    <DialogDescription>
                      Enable or disable this workflow.
                    </DialogDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value === "active"}
                      onCheckedChange={(checked) => field.onChange(checked ? "active" : "inactive")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm">Conditions</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendCondition({ field: "", operator: "", value: "" })}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Condition
                  </Button>
                </div>

                {conditionFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-start">
                    <FormField
                      control={form.control}
                      name={`conditions.${index}.field`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Field (e.g. status)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`conditions.${index}.operator`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Operator (e.g. equals)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`conditions.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Value" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCondition(index)}
                      disabled={conditionFields.length === 1}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm">Actions</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendAction({ type: "", config: {} })}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Action
                  </Button>
                </div>

                {actionFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-start">
                    <FormField
                      control={form.control}
                      name={`actions.${index}.type`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Action Type (e.g. send_email)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex-1 text-sm text-gray-500 flex items-center h-10 border rounded-md px-3 bg-gray-50">
                      Config object... (Simplified for demo)
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAction(index)}
                      disabled={actionFields.length === 1}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Workflow"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
