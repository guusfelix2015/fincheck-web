import { z } from "zod"
import { useDashboard } from "../../components/DashboadContext/useDashboard"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts"
import { useCategories } from "../../../../../app/hooks/useCategories"
import { useMemo } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { transactionService } from "../../../../../app/services/TransactionService"
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber"
import toast from "react-hot-toast"

const schema = z.object({
  value: z.union([z.number(), z.string()], { required_error: "Valor é obrigatório" }),
  name: z.string({ required_error: "Nome é obrigatório" }).min(3, "Nome deve ter pelo menos 3 caracteres"),
  categoryId: z.string({ required_error: "Categoria é obrigatória" }),
  bankAccountId: z.string({ required_error: "Conta é obrigatória" }),
  date: z.date(),
})

type FormData = z.infer<typeof schema>

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard()

  const { accounts } = useBankAccounts()
  const { categories: categoriesList } = useCategories()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: FormData) => await transactionService.create({
      bankAccountId: data.bankAccountId,
      categoryId: data.categoryId,
      value: currencyStringToNumber(data.value) / 100,
      name: data.name,
      date: data.date.toISOString(),
      type: newTransactionType!,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      closeNewTransactionModal()
      reset()
      toast.success(newTransactionType === "INCOME" ? "Receita criada com sucesso!" : "Despesa criada com sucesso!")
    },
    onError: () => {
      toast.error(newTransactionType === "INCOME" ? "Erro ao criar receita!" : "Erro ao criar despesa!")
    }
  })

  const categories = useMemo(() =>
    categoriesList.filter(category => category.type === newTransactionType),
    [categoriesList, newTransactionType]
  )


  const { register, handleSubmit: hookFormSubmit, control, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const handleSubmit = hookFormSubmit(async (data) => {
    await mutateAsync(data)
  })

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    control,
    errors,
    handleSubmit,
    reset,
    accounts,
    categories,
    isPending
  }
}