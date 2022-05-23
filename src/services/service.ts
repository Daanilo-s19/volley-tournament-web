import axios from "axios";

export default function ApiService() {
  const api = axios.create({
    baseURL: process.env.URL,
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });

  return { api };
}
