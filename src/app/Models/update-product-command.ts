// models/update-product-command.model.ts
export interface UpdateProductCommand {
    id: number;
    name: string | null;
    price: number;
    description: string | null;
  }