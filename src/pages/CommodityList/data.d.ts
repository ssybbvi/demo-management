export interface ICommodityTableListItem {
  _id: string;
  name: string;
  description: string;
  images: string[];
  fakeAmount: string;
  sales: number;
  tags: string[];
  imgesDescrptionList: string[];
  type: string;
  categoryId: string;
  skus: ISkuDto[];
  attributes: IAttributeDto[];
}

export interface ISkuDto {
  _id: string;
  name: string[];
  code: string;
  price: number;
  stock: number;
  isSufficient: boolean;
  combines: ISkuSpecificationDto[];
}

export interface ISkuSpecificationDto {
  attributeId: string;
  specificationId: string;
}

export interface CommodityTableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface CommodityTableListData {
  list: CommodityTableListItem[];
  pagination: Partial<CommodityTableListPagination>;
}

export interface CommodityTableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
