import { request } from '@@/exports';
import qs from 'qs';

export const loadData = async (params: Record<string, any>) => {
  const formValues = { ...params, pageNumber: params.current || 1 };
  // @ts-ignore
  if (formValues.rangeDate && formValues.rangeDate.length === 2) {
    // @ts-ignore
    formValues.beginDate = formValues.rangeDate[0];
    // @ts-ignore
    formValues.endDate = formValues.rangeDate[1];
  }
  // @ts-ignore
  delete formValues.rangeDate;
  return request('http://localhost:8080/api/admin/list', {
    method: 'POST',
    data: qs.stringify(formValues),
  }).then((res) => ({
    success: true,
    data: res.data.content,
    total: res.data.total,
  }));
};

export const remove = async (params: Record<string, any>) => {
  return request('http://localhost:8080/api/admin/delete', {
    method: 'POST',
    data: qs.stringify(params),
  });
};

export const save = async (params: Record<string, any>) => {
  return request(`http://localhost:8080/api/admin/${params.id ? 'update' : 'save'}`, {
    method: 'POST',
    data: qs.stringify(params),
  });
};
