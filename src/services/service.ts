import axios from "axios";
import useAppState from "../hooks/useAppState";

export default function ApiService() {
  const [user, _] = useAppState().userState;

  const token = user?.token ?? "";

  const api = axios.create({
    baseURL: process.env.URL,
    timeout: 1000,
    headers: { "Bearer Token": token },
  });

  return { api };
}
