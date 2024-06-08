import { httpClient } from "../httpClient"

export interface SignupParams {
  name: string
  email: string
  password: string
}

export async function signup(params: SignupParams) {
  const { data } = await httpClient.post<{ accessToken: string }>("/auth/signup", params)

  return data
}
