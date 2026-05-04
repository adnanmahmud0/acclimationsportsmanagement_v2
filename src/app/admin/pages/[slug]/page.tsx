import { GeneralPageEditor } from "@/components/generic-page-editor"

export default async function GenericAdminPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Format slug for title (e.g., college-prospects -> College Prospects)
  const title = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="w-full max-w-full">
      <GeneralPageEditor slug={slug} title={title} />
    </div>
  )
}
