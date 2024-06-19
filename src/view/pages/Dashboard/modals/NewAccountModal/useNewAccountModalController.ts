import { useDashboard } from "../../components/DashboadContext/useDashboard"

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard()

  return {
    isNewAccountModalOpen,
    closeNewAccountModal
  }
}