export interface Category {
  id: string
  userId: string
  name: string
  icons: string
  type: "INCOME" | "EXPENSE"
}