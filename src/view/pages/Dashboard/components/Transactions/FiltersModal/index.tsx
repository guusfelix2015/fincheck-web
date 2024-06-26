import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import { useFiltersModal } from "./useFiltersModal";
import { cn } from "../../../../../../app/utils/cn";


interface FiltersModalProps {
  open: boolean
  onClose: () => void
}

const mockedBankAccounts = [
  {
    id: "1",
    name: "Nubank",
    balance: 1000,
  },
  {
    id: "2",
    name: "XP Finance",
    balance: 1000,
  },
  {
    id: "3",
    name: "Caixa",
    balance: 1000,
  }
]

export function FiltersModal({ open, onClose }: FiltersModalProps) {
  const { handleSelectBankAccount, selectedBankAccountId, selectedYear, handleChangeYear } = useFiltersModal()
  return (
    <Modal title="Filtros" open={open} onClose={onClose} rightAction="Trash" >
      <div>
        <span className='text-lg font-bold tracking-[-1px] text-gray-800'>
          Conta
        </span>
        <div className="space-y-2 mt-2">
          {mockedBankAccounts.map((account) => (
            <button key={account.id}
              className={cn("p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors",
                account.id === selectedBankAccountId && "!bg-gray-200")}
              onClick={() => handleSelectBankAccount(account.id)}>
              {account.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className='text-lg font-bold tracking-[-1px] text-gray-800'>
          Ano
        </span>
        <div className="mt-2 w-52 flex items-center justify-between">
          <button onClick={() => handleChangeYear(-1)} className="w-12 h-12 flex items-center justify-center">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center">
            <span className="text-sm font-medium tracking-[-0.5px]">
              {selectedYear}
            </span>
          </div>
          <button onClick={() => handleChangeYear(1)} className="w-12 h-12 flex items-center justify-center">
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Button className="w-full mt-10">Aplicar filtros</Button>
    </Modal>
  )
}