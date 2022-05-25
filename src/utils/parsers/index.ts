import { AxiosResponse } from "axios";
import { RawResponse } from "../../libs/axios/types";

export default function parseResponseData<T>(
  response: AxiosResponse<RawResponse<T>>
): T {
  return response.data;
}
