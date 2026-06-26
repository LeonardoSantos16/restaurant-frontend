import { createBrowserRouter, Outlet, NavLink } from 'react-router';
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
    ],
  },
]);
