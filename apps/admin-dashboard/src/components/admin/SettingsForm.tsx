'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAdminSettings, useUpdateSettings, settingsSchema } from '@v8n/api';
import type { SettingsFormValues } from '@v8n/api';
import { Button } from '@v8n/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@v8n/ui';
import { Input } from '@v8n/ui';
import { Label } from '@v8n/ui';
import { Switch } from '@v8n/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@v8n/ui';
import { Loader2, Plus, Trash2, Upload } from 'lucide-react';

const TABS = [
  { id: 'general', label: 'General' },
  { id: 'store', label: 'Store' },
  { id: 'payment', label: 'Payment' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'notifications', label: 'Notifications' },
] as const;

type TabId = typeof TABS[number]['id'];

export function SettingsForm() {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const { data: settings, isLoading, isError, refetch } = useAdminSettings();
  const updateSettings = useUpdateSettings();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      general: { storeName: '', storeUrl: '', contactEmail: '', logo: '' },
      store: { currency: 'USD', taxEnabled: false, taxRate: 0 },
      payment: { stripeEnabled: false, paypalEnabled: false, codEnabled: false },
      shipping: { flatRateEnabled: false, freeShippingEnabled: false, rates: [] },
      notifications: { emailEnabled: false, smsEnabled: false, templates: [] },
    },
  });

  const { fields: shippingRates, append: appendRate, remove: removeRate } = useFieldArray({
    control: form.control,
    name: 'shipping.rates',
  });

  const { fields: templates, append: appendTemplate, remove: removeTemplate } = useFieldArray({
    control: form.control,
    name: 'notifications.templates',
  });

  useEffect(() => {
    if (settings) {
      form.reset(settings as SettingsFormValues);
    }
  }, [settings, form]);

  const onSubmit = (data: SettingsFormValues) => {
    updateSettings.mutate(data, {
      onSuccess: () => {
        alert('Settings saved successfully!'); // Use proper toast in real app
      },
      onError: (error) => {
        alert(error.message || 'Settings update conflict. Please reload and try again.');
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="mb-4 text-red-500">Something went wrong. Please try again.</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Mobile: Accordion / Tabs style, Desktop: Sidebar Tabs */}
        <div className="w-full lg:w-64 lg:shrink-0">
          <Card className="overflow-hidden">
            <div className="flex flex-row overflow-x-auto lg:flex-col lg:overflow-visible">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 whitespace-nowrap px-4 py-3 text-left text-sm font-medium transition-colors lg:flex-none ${activeTab === tab.id
                      ? 'border-b-2 border-blue-500 bg-blue-50 text-blue-700 lg:border-b-0 lg:border-l-4'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex-1 space-y-6 min-w-0 pb-20 lg:pb-0">
          {/* General Tab */}
          {activeTab === 'general' && (
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic information about your store.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="general.storeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Name</FormLabel>
                      <FormControl>
                        <Input placeholder="V8N E-commerce" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="general.storeUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="general.contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="admin@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="general.logo"
                  render={({ field: { value, onChange, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Store Logo</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4">
                          <div className="flex h-20 w-40 items-center justify-center rounded border border-dashed border-gray-300 bg-gray-50">
                            {typeof value === 'string' && value ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={value} alt="Logo preview" className="max-h-full max-w-full object-contain" />
                            ) : (
                              <Upload className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <Input
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) onChange(file);
                            }}
                            {...rest}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Store Tab */}
          {activeTab === 'store' && (
            <Card>
              <CardHeader>
                <CardTitle>Store Configuration</CardTitle>
                <CardDescription>Currency and tax settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="store.currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <FormControl>
                        {/* Basic native select wrapper if no ui/select */}
                        <select
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          {...field}
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="VND">VND (₫)</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="store.taxEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable Taxes</FormLabel>
                        <CardDescription>Calculate taxes during checkout</CardDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.watch('store.taxEnabled') && (
                  <FormField
                    control={form.control}
                    name="store.taxRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Rate (%)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" min="0" max="100" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
            </Card>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Configure accepted payment gateways.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="payment.stripeEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Stripe (Credit Cards)</FormLabel>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="payment.paypalEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">PayPal</FormLabel>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="payment.codEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Cash on Delivery</FormLabel>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Shipping Tab */}
          {activeTab === 'shipping' && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Methods</CardTitle>
                <CardDescription>Configure delivery options and rates.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="shipping.flatRateEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Flat Rate Shipping</FormLabel>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shipping.freeShippingEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Free Shipping</FormLabel>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Custom Rates</h3>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendRate({ method: '', cost: 0 })}>
                      <Plus className="mr-2 h-4 w-4" /> Add Rate
                    </Button>
                  </div>

                  {shippingRates.length === 0 ? (
                    <p className="text-sm text-gray-500">No custom rates configured.</p>
                  ) : (
                    <div className="space-y-4">
                      {shippingRates.map((field, index) => (
                        <div key={field.id} className="flex flex-col gap-4 sm:flex-row sm:items-end">
                          <div className="flex-1 space-y-2">
                            <Label>Method Name</Label>
                            <Input {...form.register(`shipping.rates.${index}.method` as const)} placeholder="e.g. Express" />
                          </div>
                          <div className="w-full sm:w-24 space-y-2">
                            <Label>Cost ($)</Label>
                            <Input type="number" step="0.01" min="0" {...form.register(`shipping.rates.${index}.cost` as const, { valueAsNumber: true })} />
                          </div>
                          <div className="w-full sm:w-32 space-y-2">
                            <Label>Min Order ($)</Label>
                            <Input type="number" step="0.01" min="0" placeholder="Optional" {...form.register(`shipping.rates.${index}.minOrderAmount` as const, { valueAsNumber: true })} />
                          </div>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeRate(index)} className="text-red-500 mt-2 sm:mt-0">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage automated messages sent to customers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="notifications.emailEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email Notifications</FormLabel>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notifications.smsEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">SMS Notifications</FormLabel>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Templates</h3>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendTemplate({ type: '', subject: '', body: '' })}>
                      <Plus className="mr-2 h-4 w-4" /> Add Template
                    </Button>
                  </div>

                  {templates.length === 0 ? (
                    <p className="text-sm text-gray-500">No templates configured.</p>
                  ) : (
                    <div className="space-y-4">
                      {templates.map((field, index) => (
                        <div key={field.id} className="relative rounded-lg border p-4 pt-8">
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeTemplate(index)} className="absolute right-2 top-2 text-red-500 h-6 w-6">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Type / Trigger</Label>
                              <Input {...form.register(`notifications.templates.${index}.type` as const)} placeholder="e.g. Order Confirmation" />
                            </div>
                            <div className="space-y-2">
                              <Label>Subject</Label>
                              <Input {...form.register(`notifications.templates.${index}.subject` as const)} placeholder="e.g. Your Order is Confirmed" />
                            </div>
                            <div className="space-y-2">
                              <Label>Body Message</Label>
                              {/* Standard textarea for simplicity since ui/textarea may or may not exist */}
                              <textarea
                                className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                {...form.register(`notifications.templates.${index}.body` as const)}
                                placeholder="Thank you for your purchase..."
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sticky Save Button container for mobile, inline for desktop */}
          <div className="fixed bottom-0 left-0 right-0 z-10 border-t bg-white p-4 shadow-lg md:static md:border-t-0 md:bg-transparent md:p-0 md:shadow-none">
            <div className="flex justify-end md:ml-auto">
              <Button type="submit" disabled={updateSettings.isPending} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                {updateSettings.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Settings'
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
