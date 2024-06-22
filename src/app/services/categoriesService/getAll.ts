import { Category } from "../../entities/Category"
import { httpClient } from "../httpClient"

type CayegoriesResponse = Array<Category>

export async function getAll() {
  const { data } = await httpClient.get<CayegoriesResponse>("/categories")
  return data
}
