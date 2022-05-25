import { AxiosError } from "axios";

type RawError = {
  error: {
    code: number;
    message: string;
    detail?: {
      message: string;
    };
  };
};

export type ResponseError = AxiosError<RawError>;

type DefaultResponse<Data> = Data;

export type RawResponse<Data> = DefaultResponse<Data>;
