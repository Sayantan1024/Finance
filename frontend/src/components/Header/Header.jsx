import React from 'react'
import { NavLink } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'

function Header() {
    
    const navItems = [
        {
            name: 'Home',
            slug: "/",
        },
        {
            name: 'Dashboard',
            slug: "/dashboard"
        },
        {
            name: 'My Transactions',
            slug: "/transactions"
        },
        {
            name: 'Login',
            slug: "/login"
        }    
    ]
  return (
    <header className="bg-white outline-1 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">
          Finance
        </h1>

        <nav className="flex space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.slug}
              to={item.slug}
              className={({ isActive }) =>
                `font-medium py-2 hover:text-indigo-600 transition ${
                  isActive ? 'text-indigo-600' : 'text-gray-700'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <LogoutBtn />
        </nav>
      </div>
    </header>
  )
}

export default Header