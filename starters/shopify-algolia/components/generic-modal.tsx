import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "components/ui/dialog"
import { CloseIcon } from "components/icons/close-icon"
import { cn } from "utils/cn"

interface FacetsModalProps {
  open?: boolean
  onOpenChange?: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function GenericModal({ open, onOpenChange, title, children, className }: FacetsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("max-w-[90%] content-start bg-white sm:max-w-[425px] ", className)}>
        <DialogHeader>{!!title && <DialogTitle>{title}</DialogTitle>}</DialogHeader>
        {children}
        <DialogClose className="absolute right-4 top-4 rounded-sm bg-white ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <CloseIcon />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export function Placeholder() {
  return <div className="fixed inset-0 z-50 flex items-center justify-center"></div>
}
