import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useLocation } from 'react-router';

const AUTO_CLOSE_MS = 4500;

interface CartDrawerContextValue {
  isOpen: boolean;
  /** Text for the screen-reader announcement of the last item added, if any. */
  announcement: string;
  open: () => void;
  close: () => void;
  /** Opens the drawer, (re)starts the auto-close timer, and announces `itemName`. Call after `cart.add`. */
  notifyAdd: (itemName: string) => void;
}

const CartDrawerContext = createContext<CartDrawerContextValue | null>(null);

export function CartDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { pathname } = useLocation();

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const close = useCallback(() => {
    clearTimer();
    setIsOpen(false);
  }, [clearTimer]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const notifyAdd = useCallback(
    (itemName: string) => {
      setIsOpen(true);
      setAnnouncement(`${itemName} adicionado ao carrinho.`);
      clearTimer();
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, AUTO_CLOSE_MS);
    },
    [clearTimer],
  );

  // Synchronizes with the router (an external system): closes the drawer
  // whenever the route changes, regardless of what triggered the navigation.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect, @eslint-react/set-state-in-effect -- syncing to router navigation, not state derivable from a prop
    setIsOpen(false);
    clearTimer();
  }, [pathname, clearTimer]);

  useEffect(() => clearTimer, [clearTimer]);

  return (
    <CartDrawerContext.Provider
      value={{ isOpen, announcement, open, close, notifyAdd }}
    >
      {children}
    </CartDrawerContext.Provider>
  );
}

export function useCartDrawer() {
  const ctx = useContext(CartDrawerContext);
  if (!ctx) {
    throw new Error('useCartDrawer must be used within CartDrawerProvider');
  }
  return ctx;
}
