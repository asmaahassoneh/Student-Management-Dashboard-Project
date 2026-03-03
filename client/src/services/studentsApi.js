import { requestWithFallback } from "./api";

export const studentsApi = {
  getAll: () =>
    requestWithFallback(
      (client) => client.get("/students"),
      (client) => client.get("/students"),
    ),

  getOne: (id) =>
    requestWithFallback(
      (client) => client.get(`/students/${id}`),
      (client) => client.get(`/students/${id}`),
    ),

  create: (student) =>
    requestWithFallback(
      (client) => client.post("/students", student),
      (client) => client.post("/students", student),
    ),

  update: (id, student) =>
    requestWithFallback(
      (client) => client.put(`/students/${id}`, student),
      (client) => client.put(`/students/${id}`, student),
    ),

  remove: (id) =>
    requestWithFallback(
      (client) => client.delete(`/students/${id}`),
      (client) => client.delete(`/students/${id}`),
    ),
};
