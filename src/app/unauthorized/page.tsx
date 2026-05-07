import { Metadata } from "next";
import { UnauthorizedView } from "@/components/unauthorized-view";

export const metadata: Metadata = {
  title: "Access Denied | Acclimation Sports Management",
  robots: { index: false, follow: false },
};

export default function UnauthorizedPage() {
  return <UnauthorizedView />;
}
