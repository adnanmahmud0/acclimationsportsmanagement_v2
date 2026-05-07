import { TwoWayContractsEditor } from "@/components/two-way-contracts-editor"

export default async function TwoWayContractsAdminPage() {
  return (
    <div className="w-full max-w-full">
      <TwoWayContractsEditor slug="two-way-contracts" title="Two-Way Contracts" />
    </div>
  )
}
