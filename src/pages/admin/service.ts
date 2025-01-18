import { request } from '@@/exports';
import qs from 'qs';
import {Constants} from "@/util/constants";

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
  return request(Constants.api+'/admin/list', {
    method: 'POST',
    data: qs.stringify(formValues),
  }).then((res) => ({
    success: true,
    data: res.data.content,
    total: res.data.total,
  }));
};

export const remove = async (params: Record<string, any>) => {
  return request(Constants.api+'/admin/delete', {
    method: 'POST',
    data: qs.stringify(params),
  });
};

export const save = async (params: Record<string, any>) => {
  return request(`${Constants.api}/admin/${params.id ? 'update' : 'save'}`, {
    method: 'POST',
    data: qs.stringify(params),
  });
};


export const departmentTree = async () => {
  return request(`${Constants.api}/department/tree`, {
    method: 'POST',
  });
};
export const unLock = async (params: Record<string, any>) => {
  return request(`${Constants.api}/admin/unLock`, {
    method: 'POST',
    data: qs.stringify(params),
  });
};
