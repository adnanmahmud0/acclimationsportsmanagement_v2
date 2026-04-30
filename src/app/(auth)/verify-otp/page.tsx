import { VerifyOTPForm } from "@/components/verify-otp-form"

export default function VerifyOTPPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <VerifyOTPForm />
      </div>
    </div>
  )
}
