"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function VerifyOTPForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("resetEmail")
    if (!savedEmail) {
      toast.error("Session expired. Please try again.")
      router.push("/forgot-password")
    } else {
      setEmail(savedEmail)
    }
  }, [router])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const otp = formData.get("otp")

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, oneTimeCode: Number(otp) }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success("Verification successful")
        // Store the reset token for the next step
        sessionStorage.setItem("resetToken", result.data)
        router.push("/reset-password")
      } else {
        toast.error(result.message || "Invalid OTP")
      }
    } catch (error) {
      console.error("OTP verification error:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Verify OTP</CardTitle>
          <CardDescription>
            We&apos;ve sent a code to <span className="font-semibold">{email}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="otp">Enter 4-digit code</FieldLabel>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="0000"
                  maxLength={4}
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Verifying..." : "Verify Code"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
