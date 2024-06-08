import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useLoginController } from "./useLoginController";

export function Login() {
  const { handleSubmit, register, errors, isPending } = useLoginController()
  return (
    <div>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">Entre em sua conta</h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">Novo por aqui?</span>
          <Link className="tracking-[-0.5px] text-teal-900 font-medium" to="/register">Cria uma conta</Link>
        </p>
      </header>
      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input error={errors.email?.message}  {...register("email")} name="email" type="email" placeholder="Email" />
        <Input error={errors.password?.message} {...register("password")} name="password" type="password" placeholder="Senha" />
        <Button isPending={isPending} type="submit" className="mt-2">Entrar</Button>
      </form>
    </div>
  )
}