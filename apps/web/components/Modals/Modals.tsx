"use client"

import dynamic from "next/dynamic"
import { useModalStore } from "stores/modalStore"

const LoginModal = dynamic(() => import("./LoginModal").then((m) => m.LoginModal), { loading: Placeholder })
const SignupModal = dynamic(() => import("./SignupModal").then((m) => m.SignupModal), { loading: Placeholder })

export function Modals() {
  const modals = useModalStore((s) => s.modals)

  return (
    <>
      {Object.entries(modals).map(([key, value]) => {
        return (
          <>
            {key === "login" && !!value ? <LoginModal /> : null}
            {key === "signup" && !!value ? <SignupModal /> : null}
          </>
        )
      })}
    </>
  )
}

function Placeholder() {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"></div>
}
