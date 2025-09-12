import { Atom } from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { ROUTES } from '@/shared/model/routes';

export const LayoutSidebar = (): React.ReactNode => {
  const location = useLocation();
  type MenuItem = {
    path: string;
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
  };

  type MenuGroup = {
    title: string;
    items: MenuItem[];
    visible?: boolean;
  };

  const groups: MenuGroup[] = [
    {
      title: 'Основное',
      items: [
        { path: ROUTES.HOME, label: 'Главная', icon: <Atom /> },
        { path: ROUTES.SEARCH, label: 'Поиск', icon: <Atom /> },
        { path: ROUTES.CHALLENGES, label: 'Челленджи', icon: <Atom /> },
        { path: ROUTES.CHATS, label: 'Чаты', icon: <Atom /> },
        { path: ROUTES.QNA, label: 'QnA', icon: <Atom /> },
        { path: ROUTES.KNOWLEDGE_BASE, label: 'База знаний', icon: <Atom /> },
      ],
    },
    {
      title: 'Обучение',
      items: [
        { path: ROUTES.ENROLLMENTS, label: 'Мои участия', icon: <Atom /> },
        { path: ROUTES.PROGRESS, label: 'Прогресс', icon: <Atom /> },
        { path: ROUTES.SCHEDULE, label: 'Расписание', icon: <Atom /> },
      ],
    },
    {
      title: 'Ментор',
      items: [
        { path: ROUTES.MENTOR_PROFILE, label: 'Профиль ментора', icon: <Atom /> },
        { path: ROUTES.MENTOR_APPLICATIONS, label: 'Заявки', icon: <Atom /> },
        { path: ROUTES.MENTOR_REQUESTS, label: 'Запросы', icon: <Atom /> },
        { path: ROUTES.MENTOR_AVAILABILITY, label: 'Доступность', icon: <Atom /> },
        { path: ROUTES.MENTOR_SESSIONS, label: 'Сессии', icon: <Atom /> },
      ],
    },
    {
      title: 'Оплата',
      items: [
        { path: ROUTES.PLANS, label: 'Тарифы', icon: <Atom /> },
        { path: ROUTES.SUBSCRIPTIONS, label: 'Подписки', icon: <Atom /> },
        { path: ROUTES.PAYMENTS, label: 'Платежи', icon: <Atom /> },
      ],
    },
    {
      title: 'Система',
      items: [
        { path: ROUTES.NOTIFICATIONS, label: 'Уведомления', icon: <Atom /> },
        { path: ROUTES.PROFILE, label: 'Профиль', icon: <Atom /> },
        { path: ROUTES.ADMIN, label: 'Админ', icon: <Atom /> },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 flex">
      <aside className="w-72 bg-base-200/50">
        <nav className="menu menu-vertical p-4">
          {groups
            .filter((g) => g.visible !== false)
            .map((g, idx) => (
              <div key={g.title} className="mb-2">
                <div className="collapse collapse-arrow bg-base-100">
                  <input
                    type="checkbox"
                    defaultChecked={
                      g.items.some((it) =>
                        location.pathname.startsWith(it.path)
                      ) || idx === 0
                    }
                  />
                  <div className="collapse-title text-sm font-medium">
                    {g.title}
                  </div>
                  <div className="collapse-content p-0">
                    <ul className="menu menu-sm">
                      {g.items.map((it) => (
                        <li key={it.path}>
                          <NavLink
                            to={it.path}
                            className={({ isActive }) =>
                              `flex items-center justify-between ${
                                isActive ? 'active' : ''
                              }`
                            }
                          >
                            <div className="flex items-center gap-3">
                              {it.icon}
                              <span>{it.label}</span>
                            </div>
                            {it.badge !== undefined && (
                              <span className="badge badge-sm ml-auto">{it.badge}</span>
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <section className="flex-1 p-6 overflow-auto">
          <Outlet />
        </section>
      </div>
    </div>
  );
};
