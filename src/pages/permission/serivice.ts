import { request } from '@umijs/max';
import qs from 'qs';
import dayjs from 'dayjs';

export const list = async (params: Record<string, any>) => {
  return request('http://localhost:8080/api/permission/list', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(params),
  }).then((res) => ({
    success: true,
    data: res.data.content,
    total: res.data.total,
  }));
};
export const save = async (params: Record<string, any>) => {
  return request(`http://localhost:8080/api/permission/${params.id ? 'update' : 'save'}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(params),
  });
};
export const remove = async (params: Record<string, any>) => {
  return request(`http://localhost:8080/api/permission/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(params),
  });
};
export const menu = async () => {
  return request(`http://localhost:8080/api/permission/menu`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};
