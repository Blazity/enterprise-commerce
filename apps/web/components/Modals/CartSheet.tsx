import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "components/Sheets"

export default function CartSheet() {
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
