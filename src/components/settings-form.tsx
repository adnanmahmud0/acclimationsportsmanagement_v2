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
import { Separator } from "@/components/ui/separator"

export function SettingsForm() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updatingProfile, setUpdatingProfile] = useState(false)
  const [updatingPassword, setUpdatingPassword] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await response.json()
      if (result.success) {
        setUser(result.data)
      }
    } catch (error) {
      console.error("Fetch profile error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setUpdatingProfile(true)
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) {
        toast.success(result.message)
        setUser(result.data)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setUpdatingProfile(false)
    }
  }

  const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setUpdatingPassword(true)
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords do not match")
      setUpdatingPassword(false)
      return
    }

    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("/api/user/change-password", {
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
      toast.error("Failed to change password")
    } finally {
      setUpdatingPassword(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Loading settings...</div>

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto p-4">
      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your account details and email address.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" name="name" defaultValue={user?.name} required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  defaultValue={user?.email} 
                  disabled={user?.role === "SUPER_ADMIN"}
                  className={user?.role === "SUPER_ADMIN" ? "opacity-50 cursor-not-allowed" : ""}
                />
                {user?.role === "SUPER_ADMIN" && (
                  <p className="text-[10px] text-muted-foreground mt-1">Super Admin email cannot be changed.</p>
                )}
              </Field>
              <Button type="submit" disabled={updatingProfile}>
                {updatingProfile ? "Saving..." : "Save Changes"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <Separator />

      {/* Password Section */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Change your password to keep your account secure.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="oldPassword">Current Password</FieldLabel>
                <Input id="oldPassword" name="oldPassword" type="password" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                <Input id="newPassword" name="newPassword" type="password" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm New Password</FieldLabel>
                <Input id="confirmPassword" name="confirmPassword" type="password" required />
              </Field>
              <div className="flex items-center justify-between gap-4">
                <Button type="submit" disabled={updatingPassword}>
                  {updatingPassword ? "Updating..." : "Update Password"}
                </Button>
                <Button 
                  type="button" 
                  variant="link" 
                  className="text-xs"
                  onClick={() => window.location.href = "/forgot-password"}
                >
                  Forgot your password?
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
