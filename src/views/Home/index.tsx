import { AppLayout } from "@/layout/AppLayout"
import { Outlet } from "react-router-dom"

export default function Home() {
  return (
    <AppLayout isAuthRequired={true}>
      {/* child route page */}
      <Outlet />
    </AppLayout>
  )
}
