import axios, { AxiosResponse } from 'axios';

const SLASH = '/';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

export const get = async (url: string, params?: object) => {
  try {
    const response: AxiosResponse = await instance.get(SLASH + url, params);
    return response.data;
  } catch (err) {
    console.log(err)
  }
}

export const post = async (url: string, data?: object, configParams?: object) => {
  try {
    const response: AxiosResponse = await instance.post(
      SLASH + url,
      data,
      configParams
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}