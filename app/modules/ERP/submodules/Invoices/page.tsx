'use client';

import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Invoice {
  id: string;
  client: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'sent' | 'paid' | 'overdue';
}

const initialInvoices: Invoice[] = [
  {
    id: 'INV-001',
    client: 'Acme Corp',
    amount: 1500.00,
    dueDate: '2024-04-15',
    status: 'pending',
  },
  {
    id: 'INV-002',
    client: 'TechStart Inc',
    amount: 2300.00,
    dueDate: '2024-04-01',
    status: 'sent',
  },
  {
    id: 'INV-003',
    client: 'Design Hub',
    amount: 850.00,
    dueDate: '2024-03-20',
    status: 'paid',
  },
];

export default function InvoicesPage() {
  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'sent':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">
            Manage and track your invoices
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Invoice
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            className="pl-9"
          />
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialInvoices.map((invoice) => (
              <TableRow key={invoice.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}