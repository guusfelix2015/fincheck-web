import { useDashboard } from "../../components/DashboadContext/useDashboard"

export function useNewTransactionModalController() {
  const { isNewTransactionModalOpen, closeNewTransactionModal, newTransactionType } = useDashboard()

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType
  }
}