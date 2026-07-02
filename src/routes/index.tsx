import { createBrowserRouter, Outlet, type RouteObject } from 'react-router';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import Cart from '@/pages/Cart';
import Reservation from '@/pages/Reservation';
import About from '@/pages/About';
import Categories from '@/pages/Categories';
import MenuItemDetail from '@/pages/MenuItemDetail';
import { Sidebar, SIDEBAR_COLLAPSED_WIDTH } from '@/components/Sidebar';

function Layout() {
  return (
    <>
      <Sidebar />
      <main style={{ marginLeft: SIDEBAR_COLLAPSED_WIDTH }}>
        <Outlet />
      </main>
    </>
  );
}

// Sanity-check route for the design-system tokens (colors, type scale, spotlight).
// Dev-only: excluded from production builds, never linked from navigation.
const devRoutes: RouteObject[] = import.meta.env.DEV
  ? [
      {
        path: 'design-tokens',
        lazy: async () => {
          const { default: Component } = await import('@/pages/DesignTokens');
          return { Component };
        },
      },
    ]
  : [];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'cardapio', element: <Menu /> },
      { path: 'cardapio/:id', element: <MenuItemDetail /> },
      { path: 'categorias', element: <Categories /> },
      { path: 'carrinho', element: <Cart /> },
      { path: 'reservas', element: <Reservation /> },
      { path: 'sobre', element: <About /> },
      ...devRoutes,
    ],
  },
]);
