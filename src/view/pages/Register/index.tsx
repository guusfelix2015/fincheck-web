import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useRegisterController } from "./useRegisterController";

export function Register() {
  const { errors, handleSubmit, register, isPending } = useRegisterController()

  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">Cria sua conta</h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">Já possui uma conta?</span>
          <Link className="tracking-[-0.5px] text-teal-900 font-medium" to="/login">Fazer login</Link>
        </p>
      </header>
      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input error={errors.name?.message} {...register("name")} name="name" type="text" placeholder="Nome" />
        <Input error={errors.email?.message} {...register("email")} name="email" type="email" placeholder="Email" />
        <Input error={errors.password?.message} {...register("password")} name="password" type="password" placeholder="Senha" />
        <Button isPending={isPending} type="submit" className="mt-2">Cria conta</Button>
      </form>
    </>
  )
}