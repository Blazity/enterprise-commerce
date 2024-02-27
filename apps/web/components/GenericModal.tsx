import { Dialog, DialogContent, DialogHeader, DialogTitle } from "components/Dialog"
import { cn } from "utils/cn"

interface FacetsModalProps {
  open?: boolean
  onOpenChange?: () => void
  title: string
  children: React.ReactNode
  className?: string
}

export function GenericModal({ open, onOpenChange, title, children, className }: FacetsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("max-w-[90%] bg-white sm:max-w-[425px] ", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export function Placeholder() {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"></div>
}
