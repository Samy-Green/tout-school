import { apiRequest } from "../apiRequest";

export async function loginRequest(data: {
  login: string;
  password: string;
  remember: boolean;
}) {
  return apiRequest("post", "/auth/login", data);
}

export default loginRequest;
