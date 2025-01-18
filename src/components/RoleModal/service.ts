import dayjs from "dayjs";
import {request} from "@@/exports";
import qs from "qs";
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
  return request(Constants.api+'/role/list', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(formValues),
  }).then((res) => ({
    success: true,
    data: res.data.content,
    total: res.data.total,
  }));
};
