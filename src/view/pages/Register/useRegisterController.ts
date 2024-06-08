import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query"
import { SignupParams } from "../../../app/services/authService/signup";
import toast from "react-hot-toast";



const schema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
})

type FomrData = z.infer<typeof schema>

export function useRegisterController() {
  const { handleSubmit: hookFormSubmit, register, formState: { errors } } = useForm<FomrData>({
    resolver: zodResolver(schema),
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignupParams) => await authService.signup(data),
    onSuccess: () => {
      toast.success('Successfully toasted!')
    },
    onError: () => {
      toast.error('Error toasted!')
    }
  })

  const handleSubmit = hookFormSubmit(async (data) => {
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