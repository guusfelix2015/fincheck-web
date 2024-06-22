import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboadContext/useDashboard";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";

export function useAccountsController() {
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } = useDashboard()
  const { accounts, isFetching } = useBankAccounts()
  const windowWidth = useWindowWidth()
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  })

  const currentBalance = useMemo(() => {
    return accounts.reduce((total, account) => total + account.currentBalance, 0)
  }, [accounts])

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts,
    openNewAccountModal,
    currentBalance
  }
}