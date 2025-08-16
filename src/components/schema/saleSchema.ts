import { z } from "zod";

const saleFormSchema = z.object({
  negotiationDate: z.date({
    required_error: "Data da negociação é obrigatória",
  }),
  clientName: z
    .string()
    .min(2, "Nome do cliente deve ter pelo menos 2 caracteres"),
  realtorName: z
    .string()
    .min(2, "Nome do corretor/imobiliária deve ter pelo menos 2 caracteres"),
  paymentMethod: z.string().min(1, "Forma de pagamento é obrigatória"),
  deliveryDate: z.date({
    required_error: "Data de entrega é obrigatória",
  }),
});
export default saleFormSchema;

export type SaleFormData = z.infer<typeof saleFormSchema>;
