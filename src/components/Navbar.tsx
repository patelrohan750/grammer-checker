"use client"
import React from 'react'
import Link from "next/link"

const Navbar = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
       <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            Grammer Checker
        </Link>
       </nav>
    </header>
  )
}

export default Navbar