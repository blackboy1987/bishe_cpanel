import { request } from '@umijs/max';
import qs from 'qs';
import dayjs from 'dayjs';

export const list = async (params: Record<string, any>) => {
  const formValues = { ...params, pageNumber: params.current || 1 };
  return request('http://localhost:8080/api/department/list', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(formValues),
  }).then((res) => ({
    success: true,
    data: res.data,
    total: res.data.length,
  }));
};
export const save = async (params: Record<string, any>) => {
  return request(`http://localhost:8080/api/department/${params.id ? 'update' : 'save'}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(params),
  });
};
export const remove = async (params: Record<string, any>) => {
  return request(`http://localhost:8080/api/department/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(params),
  });
};
export const tree = async () => {
  return request(`http://localhost:8080/api/department/tree`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};
