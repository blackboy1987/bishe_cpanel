import { request } from '@umijs/max';
import qs from 'qs';
import dayjs from 'dayjs';
import {Constants} from "@/util/constants";

export const list = async (params: Record<string, any>) => {
  return request(Constants.api+'/permission/list', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
      ...params,
      pageNumber: params.current || 1,
    }),
  }).then((res) => ({
    success: true,
    data: res.data.content,
    total: res.data.total,
  }));
};
export const save = async (params: Record<string, any>) => {
  return request(`${Constants.api}/permission/${params.id ? 'update' : 'save'}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(params),
  });
};
export const remove = async (params: Record<string, any>) => {
  return request(`${Constants.api}/permission/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(params),
  });
};
export const menu = async () => {
  return request(`${Constants.api}/permission/menu`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};
