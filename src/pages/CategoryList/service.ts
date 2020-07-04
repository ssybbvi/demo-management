import request from '@/utils/request';
import { TableListParams, CategoryDtoWithCreate, ICategoryDto } from './data.d';

export async function queryRule(params?: TableListParams): Promise<{ data: ICategoryDto[] }> {
  const result = await request<ICategoryDto[]>('/category', {
    params,
  });

  return { data: result };
}

export async function removeRule(params: { key: number[] }) {
  return request('/category', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: CategoryDtoWithCreate) {
  return request('/category', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: ICategoryDto) {
  return request('/category', {
    method: 'PUT',
    data: params,
  });
}
