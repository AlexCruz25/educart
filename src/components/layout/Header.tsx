import { Link, useNavigate } from "react-router-dom";
import { useCartSummary } from "../../features/Cart/hooks/useCart";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { logout } from "../../features/Auth/redux/authSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, username } = useAppSelector((state) => state.auth);
  const { data: cartSummary } = useCartSummary({ enabled: isAuthenticated });

  const cartCount = cartSummary?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 text-white">
        
        <Link to="/" className="text-2xl font-bold tracking-wide">
          EduCart
        </Link>

        <ul className="hidden md:flex space-x-6 text-sm font-medium items-center">
          <li>
            <Link to="/" className="hover:text-yellow-300 transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
             <Link to="/products" className="hover:text-yellow-300 transition-colors duration-200">
              Products
            </Link>
          </li>
          
          <li>
            <Link to="/cart" className="hover:text-yellow-300 transition-colors duration-200 flex items-center gap-1">
              🛒
              <span className="text-xs bg-yellow-300 text-indigo-900 px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </Link>
          </li>
          {isAuthenticated && username === "admin" && (
            <li>
              <Link to="/admin/products" className="hover:text-yellow-300 transition-colors duration-200">
                Admin
              </Link>
            </li>
          )}
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/login" className="hover:text-yellow-300 transition-colors duration-200">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-yellow-300 transition-colors duration-200">
                  Register
                </Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wide bg-white/20 px-2 py-1 rounded">
                {username}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm bg-white/20 px-3 py-1 rounded hover:bg-white/30"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        <button
          className="md:hidden text-2xl"
          onClick={() => navigate(isAuthenticated ? "/cart" : "/login")}
        >
          🛒
        </button>
      </nav>
    </header>
  );
}

