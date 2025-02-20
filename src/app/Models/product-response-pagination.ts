import { ProductResponse } from "./product-response";

export interface ProductResponsePagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: ProductResponse[] | null;
  }