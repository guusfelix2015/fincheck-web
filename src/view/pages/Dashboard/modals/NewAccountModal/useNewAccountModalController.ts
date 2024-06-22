import { useForm } from "react-hook-form"
import { useDashboard } from "../../components/DashboadContext/useDashboard"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { bankAccountsService } from "../../../../../app/services/bankAccountsService"
import toast from "react-hot-toast"
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber"

const schema = z.object({
  initialBalance: z.string({ required_error: "Saldo inicial é obrigatório" }),
  name: z.string({ required_error: "Nome é obrigatório" }).min(3, "Nome deve ter pelo menos 3 caracteres"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"], { message: "Tipo é obrigatório" }),
  color: z.string({ required_error: "Cor é obrigatória" }),
})

type FormData = z.infer<typeof schema>

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard()

  const { register, handleSubmit: hookFormSubmit, control, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const queryClient = useQueryClient()

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: FormData) => await bankAccountsService.create({
      color: data.color,
      name: data.name,
      initialBalance: currencyStringToNumber(data.initialBalance) / 100,
      type: data.type,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bank-accounts"] })
      toast.success('Conta criada com sucesso!')
      closeNewAccountModal()
      reset()
    },
    onError: () => {
      toast.error('Erro ao criar conta!')
    }
  })

  const handleSubmit = hookFormSubmit(async (data) => {
    await mutateAsync(data)
  })


  return {
    isNewAccountModalOpen,
    errors,
    control,
    register,
    handleSubmit,
    closeNewAccountModal,
    isPending
  }
}