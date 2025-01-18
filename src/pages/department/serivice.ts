import { request } from '@umijs/max';
import qs from 'qs';
import dayjs from 'dayjs';
import {Constants} from "@/util/constants";

export const list = async (params: Record<string, any>) => {
  const formValues = { ...params, pageNumber: params.current || 1 };
  return request(Constants.api+'/department/list', {
    method: 'POST',
    data: qs.stringify(formValues),
  }).then((res) => ({
    success: true,
    data: res.data,
    total: res.data.length,
  }));
};
export const save = async (params: Record<string, any>) => {
  return request(`${Constants.api}/department/${params.id ? 'update' : 'save'}`, {
    method: 'POST',
    data: qs.stringify(params),
  });
};
export const remove = async (params: Record<string, any>) => {
  return request(`${Constants.api}/department/delete`, {
    method: 'POST',
    data: qs.stringify(params),
  });
};
export const tree = async () => {
  return request(`${Constants.api}/department/tree`, {
    method: 'POST',
  });
};
