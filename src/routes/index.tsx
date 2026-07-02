import { createBrowserRouter, Outlet, type RouteObject } from 'react-router';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import Cart from '@/pages/Cart';
import Reservation from '@/pages/Reservation';
import About from '@/pages/About';
import MenuItemDetail from '@/pages/MenuItemDetail';
import { CartDrawer } from '@/components/CartDrawer';
import { LiveRegion } from '@/components/LiveRegion';
import { Sidebar, SIDEBAR_COLLAPSED_WIDTH } from '@/components/Sidebar';
import { CartDrawerProvider } from '@/context/CartDrawerContext';

// CartDrawerProvider reads the current route (to close the drawer on
// navigation), so it must live inside the router tree rather than wrapping
// RouterProvider in main.tsx.
function Layout() {
  return (
    <CartDrawerProvider>
      <Sidebar />
      <main style={{ marginLeft: SIDEBAR_COLLAPSED_WIDTH }}>
        <Outlet />
      </main>
      <CartDrawer />
      <LiveRegion />
    </CartDrawerProvider>
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
      { path: 'carrinho', element: <Cart /> },
      { path: 'reservas', element: <Reservation /> },
      { path: 'sobre', element: <About /> },
      ...devRoutes,
    ],
  },
]);
