import { ExitIcon } from "@radix-ui/react-icons"
import { DropdownMenu } from "./DropdownMenu"
import { useAuth } from "../../app/hooks/useAuth"

DropdownMenu
export function UserMenu() {
  const { signout } = useAuth()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-50 rounded-full h-12 w-12 flex items-center justify-center border border-teal-300">
          <span className="text-sm tracking-[-0.5px] font-medium text-teal-900">GA</span>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-32 mt-1">
        <DropdownMenu.Item className="flex items-center justify-between" onSelect={signout}>
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}