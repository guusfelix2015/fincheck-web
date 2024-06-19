import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../../app/utils/cn';
import { Cross2Icon } from '@radix-ui/react-icons';

interface ModalProps {
  open: boolean
  children: React.ReactNode
  title: string
  rightAction?: React.ReactNode
  onClose?: () => void
}

export function Modal({ children, title, open, rightAction, onClose }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn('fixed inset-0 bg-black/50 backdrop-blur-sm z-50',
            "data-[state=open]:animate-overlayShow")} />
        <Dialog.Content
          className={cn("outline-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-[51] shadow-lg w-full max-w-[400px]",
            "data-[state=open]:animate-contentShow")}>
          <header className="h-12 flex items-center justify-between text-gray-800">
            <button onClick={onClose} className='w-12 h-12 flex items-center justify- outline-none'>
              <Cross2Icon className='w-6 h-6' />
            </button>
            <span className='text-lg font-bold tracking-[-1px]'>
              {title}
            </span>
            <div className='w-12 h-12 flex items-center justify-center'>
              {rightAction}
            </div>
          </header>
          <div>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
