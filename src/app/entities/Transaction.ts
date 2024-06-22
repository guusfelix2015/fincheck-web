export interface Transaction {
  id: string
  value: number
  name: string
  date: string
  type: "INCOME" | "EXPENSE"
  categoryId: string
  bankAccountId: string
}
