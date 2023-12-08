import { AppLayout } from "@/layout/AppLayout"
import { Outlet } from "react-router-dom"

export default function Public() {
  return (
    <AppLayout>
      {/* child route page */}
      <Outlet />
    </AppLayout>
  )
}
