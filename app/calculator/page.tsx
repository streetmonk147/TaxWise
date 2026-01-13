"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CalculatorPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace("/taxpadi/calculator")
  }, [router])
  
  return null
}
