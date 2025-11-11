export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white mt-10">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Columna 1: descripción */}
        <div>
          <h3 className="text-lg font-semibold mb-3">About EduCart</h3>
          <p className="text-gray-200 leading-relaxed">
            EduCart is your one-stop shop for study materials, tech gadgets, and
            workspace essentials — designed to make learning smarter and more
            productive.
          </p>
        </div>

        {/* Columna 2: enlaces */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/cart"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Cart
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 3: contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-gray-200">Email: support@educart.com</p>
          <p className="text-gray-200">Phone: +1 555 123 4567</p>
          <p className="text-gray-200 mt-2">© 2025 EduCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
