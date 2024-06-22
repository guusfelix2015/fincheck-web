import { useForm } from "react-hook-form"
import { useDashboard } from "../../components/DashboadContext/useDashboard"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { bankAccountsService } from "../../../../../app/services/bankAccountsService"
import toast from "react-hot-toast"
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber"
import { useEffect, useState } from "react"

const schema = z.object({
  initialBalance: z.union([z.number(), z.string({ required_error: "Saldo inicial é obrigatório" })]),
  name: z.string({ required_error: "Nome é obrigatório" }).min(3, "Nome deve ter pelo menos 3 caracteres"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"], { message: "Tipo é obrigatório" }),
  color: z.string({ required_error: "Cor é obrigatória" }),
})

type FormData = z.infer<typeof schema> & { id: string }

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountToEdit } = useDashboard()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { register,
    handleSubmit: hookFormSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })


  useEffect(() => {
    if (accountToEdit) {
      setValue("name", accountToEdit.name)
      setValue("initialBalance", accountToEdit.initialBalance)
      setValue("type", accountToEdit.type)
      setValue("color", accountToEdit.color)
    }
    return () => {
      reset()
    }
  }, [accountToEdit, setValue, reset]);

  const queryClient = useQueryClient()

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: FormData) => await bankAccountsService.update({
      // Non-null assertion because we are using the `id` field in the form
      id: accountToEdit!.id,
      color: data.color,
      name: data.name,
      initialBalance: currencyStringToNumber(data.initialBalance) / 100,
      type: data.type,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bank-accounts"] })
      toast.success('Conta atualizada com sucesso!')
      closeEditAccountModal()
      reset()
    },
    onError: () => {
      toast.error('Erro ao atualizar conta!')
    }
  })

  const { isPending: isDeleting, mutateAsync: deleteAccount } = useMutation({
    mutationFn: async () => await bankAccountsService.deleteAccount(accountToEdit!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bank-accounts"] })
      toast.success('Conta excluída com sucesso!')
      closeEditAccountModal()
      handleCloseDeleteModal()
      reset()
    },
    onError: () => {
      toast.error('Erro ao excluir conta!')
    }
  })

  const handleSubmit = hookFormSubmit(async (data) => {
    await mutateAsync(data)
  })

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  async function handleDeleteAccount() {
    await deleteAccount()
  }


  return {
    isEditAccountModalOpen,
    errors,
    control,
    isPending,
    isDeleteModalOpen,
    isDeleting, 
    register,
    handleSubmit,
    closeEditAccountModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount
  }
}