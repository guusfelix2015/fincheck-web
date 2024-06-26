import React, { createContext, useCallback, useState } from "react";
import { BankAccount } from "../../../../../app/entities/BankAccount";



interface DashboardContextValue {
  areValuesVisible: boolean
  isNewAccountModalOpen: boolean
  isNewTransactionModalOpen: boolean
  isEditAccountModalOpen: boolean
  newTransactionType: "INCOME" | "EXPENSE" | null
  accountToEdit: null | BankAccount
  toggleValuesVisibility: () => void
  openNewAccountModal: () => void
  closeNewAccountModal: () => void
  openNewTransactionModal: (type: "INCOME" | "EXPENSE") => void
  closeNewTransactionModal: () => void
  openEditAccountModal: (bankAccount: BankAccount) => void
  closeEditAccountModal: () => void
}

export const DashboardContext = createContext({} as DashboardContextValue)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true)
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false)
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false)
  const [accountToEdit, setAccountToEdit] = useState<null | BankAccount>(null)
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)
  const [newTransactionType, setNewTransactionType] = useState<"INCOME" | "EXPENSE" | null>(null)

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible(prev => !prev)
  }, [])

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true)
  }, [])

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false)
  }, [])

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountToEdit(bankAccount)
    setIsEditAccountModalOpen(true)
  }, [])

  const closeEditAccountModal = useCallback(() => {
    setIsEditAccountModalOpen(false)
    setAccountToEdit(null)
  }, [])

  const openNewTransactionModal = useCallback((type: "INCOME" | "EXPENSE") => {
    setNewTransactionType(type)
    setIsNewTransactionModalOpen(true)
  }, [])

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null)
    setIsNewTransactionModalOpen(false)
  }, [])

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        isNewAccountModalOpen,
        newTransactionType,
        isNewTransactionModalOpen,
        isEditAccountModalOpen,
        accountToEdit,
        toggleValuesVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
        openEditAccountModal,
        closeEditAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}