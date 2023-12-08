import router from "@/router"
import { Link } from "react-router-dom"

export default function Landing() {
  const { routes } = router
  const practicesRoutes =
    routes[0].children?.[0].children?.filter((route) => {
      return route.index
        ? { path: "/", title: route.id }
        : { path: route.path, title: route.id }
    }) ?? []

  return (
    <div className="navbar">
      <ul className="py-2 px-4">
        {practicesRoutes.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.path ?? "/"}>{item.id}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
