// src/components/Breadcrumbs.tsx
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import React from 'react';

export default function Breadcrumb({ links }: { links: { name: string, url?: string }[] }) {
  return (
    <nav className="text-gray-600 dark:text-gray-400 text-sm mt-8 ">
      <ol className="flex items-center space-x-2">
        {links.map((link, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index > 0 && <FaChevronRight className="text-gray-400" size={12} />}
            {link.url ? (
              <Link href={link.url} className="hover:text-green-500 font-medium">
                {link.name}
              </Link>
            ) : (
              <span className="text-gray-500 dark:text-gray-300">{link.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}