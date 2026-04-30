"use client"

import React, { useState } from "react"
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

export function CreateAdminForm() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("/api/admin/create-admin", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        toast.success(result.message)
        ;(event.target as HTMLFormElement).reset()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Create admin error:", error)
      toast.error("Failed to create admin account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Admin</CardTitle>
        <CardDescription>
          Register a new administrator account with full dashboard access.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" name="name" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <Input id="email" name="email" type="email" placeholder="admin@example.com" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Initial Password</FieldLabel>
              <Input id="password" name="password" type="password" required minLength={8} />
            </Field>
            <Field>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Creating..." : "Create Admin Account"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
