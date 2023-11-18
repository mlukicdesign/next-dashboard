'use server'

// Type validation library
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// The amount field is specifically set to coerce (change) from a string to a number while also validating its type.

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });




 

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status} = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });


    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql `
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}




// Extracting the data from formData
// Validating the types with ZOD
// Converting the amounts to cents
// Passing variables to your SQL query
// Calling the revalidatePath to clear client cache and make a new server request
// Calling redirect to redirect the user to the invoice's page



const UpdateInvoice = InvoiceSchema.omit({ id: true,  date: true });

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status} = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100;

    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}