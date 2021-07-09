import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Inject, Service } from 'typedi';
import {AXIOS_INSTANCE_TOKEN} from "./http.constants";

@Service()
export class HttpService {
  constructor(
    @Inject(AXIOS_INSTANCE_TOKEN)
    private readonly instance: AxiosInstance = Axios,
  ) {}

  public request<T, R = AxiosResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R> {
    return this.instance.request(config);
  }

  public get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.instance.get(url, config);
  }

  public delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.instance.delete(url, config);
  }

  public head<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.instance.head(url, config);
  }

  public post<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.instance.post(url, data, config);
  }

  public put<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.instance.put(url, data, config);
  }

  public patch<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.instance.patch(url, data, config);
  }

  get axios(): AxiosInstance {
    return this.instance;
  }
}
