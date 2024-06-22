import { TrashIcon } from "@radix-ui/react-icons";
import { Modal } from "./Modal";
import { Button } from "./Button";


interface ConfirmDeleteModalProps {
  onConfirm: () => void
  onClose: () => void
  title: string
  description?: string
  isDeleting?: boolean
}

export function ConfirmDeleteModal({ onClose, onConfirm, title, description, isDeleting }: ConfirmDeleteModalProps) {
  return (
    <Modal title="Excluir" open onClose={onClose} >
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-red-50 text-white">
          <TrashIcon className="w-6 h-6 text-red-900 cursor-pointer" />
        </div>
        <p className="w-[190px] text-gray-800 font-bold tracking-[-0.5px]">{title}</p>
        {description && (
          <p className="tracking-[-0.5px] text-gray-800">{description}</p>
        )}
      </div>
      <div className="mt-10 space-y-4">
        <Button
          className="w-full" variant="danger" onClick={onConfirm} disabled={isDeleting}>
          Sim, desejo excluir
        </Button>
        <Button
          className="w-full" variant="ghost" onClick={onClose} disabled={isDeleting}>
          Cancelar
        </Button>
      </div>
    </Modal>
  )
}