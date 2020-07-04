import request from '@/utils/request';
import { CommodityTableListParams } from './data.d';

export async function queryRule(params?: CommodityTableListParams) {
  const result = await request('/commodity', {
    params,
  });

  console.log('xxx123', result.data.commoditys);
  return result.data.commoditys;
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: CommodityTableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: CommodityTableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
