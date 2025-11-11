import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 text-white">
        {/* Logo / Nombre */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          EduCart
        </Link>

        {/* Links de navegación */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Products
            </Link>
          </li>
          {/* <li>
            <Link
              to="/cart"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Register
            </Link>
          </li> */}
        </ul>

        {/* Contador del carrito */}
        <div className="relative hidden md:block">
          <Link to="/cart" className="hover:text-yellow-300">
            🛒
          </Link>
          <span
            id="cart-counter"
            className="absolute -top-2 -right-2 bg-yellow-400 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full"
          >
            0
          </span>
        </div>
      </nav>
    </header>
  );
}

