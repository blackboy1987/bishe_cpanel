import { request } from '@umijs/max';
import qs from 'qs';
import dayjs from 'dayjs';

export const list = async (params: Record<string, any>) => {
  const formValues = { ...params, pageNumber: params.current || 1 };
  // @ts-ignore
  if (formValues.rangeDate && formValues.rangeDate.length === 2) {
    // @ts-ignore
    formValues.beginDate = dayjs(formValues.rangeDate[0]).format('YYYY-MM-DD 00:00:00');
    // @ts-ignore
    formValues.endDate = dayjs(formValues.rangeDate[1]).format('YYYY-MM-DD 23:59:59');
  }
  // @ts-ignore
  delete formValues.rangeDate;
  return request('http://localhost:8080/api/role/list', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(formValues),
  }).then((res) => ({
    success: true,
    data: res.data.content,
    total: res.data.total,
  }));
};
export const save = async (params: Record<string, any>) => {
  return request(`http://localhost:8080/api/role/${params.id ? 'update' : 'save'}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(params),
  });
};
export const remove = async (params: Record<string, any>) => {
  return request(`http://localhost:8080/api/role/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(params),
  });
};

export const departmentTree = async () => {
  return request(`http://localhost:8080/api/department/tree`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};
export const permission = async (params: Record<string, any>) => {
  return request(`http://localhost:8080/api/role/permission`, {
    method: 'POST',
    data: qs.stringify(params),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};

export const savePermission = async (params: Record<string, any>) => {
  return request(`http://localhost:8080/api/role/savePermission`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(params),
  });
};
