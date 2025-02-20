export interface ProductResponse {
    id: number;
    name: string | null;
    description: string | null;
    price: number;
    createdBy: string | null;
    createdDate: string;
    lastModifiedBy: string | null;
    lastModifiedDate: string;
  }