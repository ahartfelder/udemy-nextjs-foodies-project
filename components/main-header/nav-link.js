"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./nav-link.module.css";

export default function NavLink({ href, children }) {
  const path = usePathname();

  return (
    <Link
      className={
        styles.link + (path.startsWith(href) ? ` ${styles.active}` : "")
      }
      href={href}
    >
      {children}
    </Link>
  );
}
