import { z } from "zod";

export const createOrderSchema = z.object({
  tableNo: z.number().int("Table number must be integer").positive(),
});
