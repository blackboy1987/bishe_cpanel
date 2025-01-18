import { request } from '@umijs/max';
import qs from 'qs';
import dayjs from 'dayjs';
import {Constants} from "@/util/constants";

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
  return request(Constants.api+'/menu/list', {
    method: 'POST',
    data: qs.stringify(formValues),
  }).then((res) => ({
    success: true,
    data: res.data,
    total: res.data.length,
  }));
};
export const save = async (params: Record<string, any>) => {
  return request(`${Constants.api}/menu/${params.id ? 'update' : 'save'}`, {
    method: 'POST',
    data: qs.stringify(params),
  });
};
export const remove = async (params: Record<string, any>) => {
  return request(`${Constants.api}/menu/delete`, {
    method: 'POST',
    data: qs.stringify(params),
  });
};
export const tree = async () => {
  return request(`${Constants.api}/menu/tree`, {
    method: 'POST',
  });
};
