import API from "./axios";

export const createRequest = (data) => {
  return API.post("/request/create", data);
};