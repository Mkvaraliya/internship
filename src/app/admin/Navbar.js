const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <ul className="flex space-x-4">
        <li>
          <a href="/admin/products" className="hover:text-gray-400">
            Products
          </a>
        </li>
        <li>
          <a href="/admin/users" className="hover:text-gray-400">
            Users
          </a>
        </li>
      </ul>
      <div className="flex gap-3 items-center">
        <h1>Welcome, Admin</h1>
        <button className="bg-red-500 px-5 py-2 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
