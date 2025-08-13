import {ROUTES} from "@/shared/model/routes.ts";
import {Atom} from "lucide-react";
import {Link, Outlet} from "react-router";
import {Fragment, useState} from "react";

export const LayoutSidebar = (): React.ReactNode => {
  const [open, setOpen] = useState<boolean>(false);

  const menu = [
    {
      path: ROUTES.HOME,
      label: 'Главная',
      icon: <Atom/>
    },
    {
      path: ROUTES.SEARCH,
      label: 'Поиск',
      icon: <Atom/>
    },
    {
      path: ROUTES.SCHEDULE,
      label: 'Расписание',
      icon: <Atom/>
    },
    {
      path: ROUTES.KNOWLEDGE_BASE,
      label: 'База знаний',
      icon: <Atom/>
    }
  ]

  return (
    <div className="min-h-screen bg-base-200 flex">
      <aside>
        <nav className="menu menu-vertical p-4">
          {menu.map((it) => (
            <li key={it.path}>
              <Link to={it.path} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {it.icon}
                  <span>{it.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <section className="flex-1 p-6 overflow-auto"><Outlet/></section>
      </div>
    </div>
  )
}