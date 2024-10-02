"use client"

import { Button } from "components/Button/Button"
import { useModalStore } from "stores/modalStore"

export function AuthActions() {
  const openModal = useModalStore((s) => s.openModal)

  return (
    <div className="flex items-center space-x-4">
      <Button className="leading-[18px]" onClick={() => openModal("login")}>
        Log In
      </Button>
      <Button className="leading-[18px] hover:text-white" variant="secondary" isAnimated={false} onClick={() => openModal("signup")}>
        Sign Up
      </Button>
    </div>
  )
}
