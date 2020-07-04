import { IAttributeDto } from '../../components/Attributes/data';

export type CategoryDtoWithCreate = Omit<ICategoryDto, 'attributes'>;

export interface ICategoryDto {
  _id?: string;
  name: string;
  parentId?: string;
  attributes: IAttributeDto[];
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
