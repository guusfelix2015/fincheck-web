import { httpClient } from "../httpClient"

export async function deleteAccount(id: string) {
  const { data } = await httpClient.delete(`/bank-accounts/${id}`)
  return data
}
