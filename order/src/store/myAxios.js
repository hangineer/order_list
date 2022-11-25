import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "X-Requested-With": "XMLHttpRequest" },
});
export const apiCollect = instance;
