import axios from "axios";

const instance = axios.create({
  baseURL: "https://planet-showy-flower.glitch.me/",
  headers: { "X-Requested-With": "XMLHttpRequest" },
});
export const apiCollect = instance;
