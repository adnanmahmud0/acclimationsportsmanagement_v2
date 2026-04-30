import { CreateAdminForm } from "@/components/create-admin-form"

export default function ManageAdminsPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Manage Admins</h1>
        <p className="text-muted-foreground">
          View and create administrator accounts for the system.
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="w-full max-w-md">
          <CreateAdminForm />
        </div>
      </div>
    </div>
  )
}
