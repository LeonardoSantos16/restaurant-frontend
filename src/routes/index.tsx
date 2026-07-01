import {
  createBrowserRouter,
  Outlet,
  NavLink,
  type RouteObject,
} from 'react-router';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import Cart from '@/pages/Cart';
import Reservation from '@/pages/Reservation';
import About from '@/pages/About';

function Layout() {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/cardapio">Cardápio</NavLink>
          <NavLink to="/carrinho">Carrinho</NavLink>
          <NavLink to="/reservas">Reservas</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
        </nav>
      </header>
      <main>
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
      { path: 'carrinho', element: <Cart /> },
      { path: 'reservas', element: <Reservation /> },
      { path: 'sobre', element: <About /> },
      ...devRoutes,
    ],
  },
]);
