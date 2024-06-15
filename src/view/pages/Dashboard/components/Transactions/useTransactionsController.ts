import { useDashboard } from "../DashboadContext/useDashboard";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard()


  return {
    areValuesVisible,
    isLoading: false,
    transactions: []
  }
}