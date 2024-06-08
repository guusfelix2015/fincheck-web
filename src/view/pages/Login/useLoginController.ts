import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { authService } from "../../../app/services/authService"
import { SigninParams } from "../../../app/services/authService/signin"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

const schema = z.object({
  email: z.string().email("Informe um e-mail válido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
})

type FomrData = z.infer<typeof schema>

export function useLoginController() {
  const { handleSubmit: hookFormHandleSubmit, register, formState: { errors } } = useForm<FomrData>({
    resolver: zodResolver(schema),
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SigninParams) => await authService.signin(data),
    onSuccess: () => {
      toast.success('Login successfully!')  
    },
    onError: () => {
      toast.error('Credentials invalid!')
    }
  })



  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const { accessToken } = await mutateAsync(data)
    console.log({ accessToken })
  })

  return {
    handleSubmit,
    register,
    errors,
    isPending
  }
}