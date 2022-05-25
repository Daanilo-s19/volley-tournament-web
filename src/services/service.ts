import axios from "axios";
import useAppState from "../hooks/useAppState";

function initClient() {
  // const [user, _] = useAppState().userState;

  // const token = user?.token ?? "";
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,

    headers: {
      "Content-Type": "text/plain",
      // "Bearer Token": token
    },
  });
}

export const ApiService = initClient();
