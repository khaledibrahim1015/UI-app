// models/create-product-command.model.ts
export interface CreateProductCommand {
    name: string | null;
    description: string | null;
    price: number;
  }