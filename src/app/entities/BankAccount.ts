export interface BankAccount {
  id: string
  name: string
  initialBalance: number
  currentBalance: number
  type: "CHECKING" | "INVESTMENT" | "CASH"
  color: string
}