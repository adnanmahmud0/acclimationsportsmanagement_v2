"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { toast } from "sonner"
import { Trash2Icon, PencilIcon, PlusIcon } from "lucide-react"

export function AdminManagement() {
  const [admins, setAdmins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [currentAdmin, setCurrentAdmin] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("/api/admin/admins", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await response.json()
      if (result.success) {
        setAdmins(result.data)
      }
    } catch (error) {
      toast.error("Failed to fetch admins")
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) {
        toast.success("Admin created successfully")
        setIsCreateOpen(false)
        fetchAdmins()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch(`/api/admin/admins/${currentAdmin._id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) {
        toast.success("Admin updated successfully")
        setIsEditOpen(false)
        fetchAdmins()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin?")) return

    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch(`/api/admin/admins/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await response.json()
      if (result.success) {
        toast.success("Admin deleted successfully")
        fetchAdmins()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Manage Admins</h1>
          <p className="text-white/50 text-sm">View and manage administrator accounts.</p>
        </div>
        
        {/* Create Admin Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger
            render={
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-none shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
                <PlusIcon className="size-4" />
                Create Admin
              </Button>
            }
          />
          <DialogContent className="border-white/10 bg-[#05070a]/95 backdrop-blur-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Admin</DialogTitle>
              <DialogDescription className="text-white/50">Enter details for the new administrator.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 mt-4">
              <FieldGroup>
                <Field>
                  <FieldLabel className="text-white/70">Full Name</FieldLabel>
                  <Input name="name" placeholder="John Doe" className="bg-white/5 border-white/10 text-white placeholder:text-white/20" required />
                </Field>
                <Field>
                  <FieldLabel className="text-white/70">Email Address</FieldLabel>
                  <Input name="email" type="email" placeholder="admin@example.com" className="bg-white/5 border-white/10 text-white placeholder:text-white/20" required />
                </Field>
                <Field>
                  <FieldLabel className="text-white/70">Initial Password</FieldLabel>
                  <Input name="password" type="password" className="bg-white/5 border-white/10 text-white" required minLength={8} />
                </Field>
                <Button type="submit" disabled={submitting} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold">
                  {submitting ? "Creating..." : "Create Admin"}
                </Button>
              </FieldGroup>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-[#05070a]/40 border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/70 font-bold py-4">Name</TableHead>
                <TableHead className="text-white/70 font-bold py-4">Email</TableHead>
                <TableHead className="text-white/70 font-bold py-4">Created At</TableHead>
                <TableHead className="text-right text-white/70 font-bold py-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-white/30">
                    <div className="flex items-center justify-center gap-2">
                      <div className="size-2 bg-blue-500 rounded-full animate-bounce" />
                      <div className="size-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="size-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : admins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-white/30 italic">No admin accounts found.</TableCell>
                </TableRow>
              ) : (
                admins.map((admin) => (
                  <TableRow key={admin._id} className="border-white/5 hover:bg-white/5 transition-all duration-200">
                    <TableCell className="font-medium text-white py-4">{admin.name}</TableCell>
                    <TableCell className="text-white/70 py-4">{admin.email}</TableCell>
                    <TableCell className="text-white/40 py-4 text-xs uppercase tracking-wider">{new Date(admin.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</TableCell>
                    <TableCell className="text-right py-4">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon-sm"
                          className="hover:bg-blue-500/20 hover:text-blue-400 text-white/40"
                          onClick={() => {
                            setCurrentAdmin(admin)
                            setIsEditOpen(true)
                          }}
                        >
                          <PencilIcon className="size-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon-sm"
                          className="hover:bg-red-500/20 hover:text-red-400 text-white/40"
                          onClick={() => handleDelete(admin._id)}
                        >
                          <Trash2Icon className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Admin Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="border-white/10 bg-[#05070a]/95 backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Admin</DialogTitle>
            <DialogDescription className="text-white/50">Update the name or email for this administrator.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4 mt-4">
            <FieldGroup>
              <Field>
                <FieldLabel className="text-white/70">Full Name</FieldLabel>
                <Input 
                  name="name" 
                  defaultValue={currentAdmin?.name} 
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                  required 
                />
              </Field>
              <Field>
                <FieldLabel className="text-white/70">Email Address</FieldLabel>
                <Input 
                  name="email" 
                  type="email" 
                  defaultValue={currentAdmin?.email} 
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                  required 
                />
              </Field>
              <Button type="submit" disabled={submitting} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold">
                {submitting ? "Updating..." : "Save Changes"}
              </Button>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
