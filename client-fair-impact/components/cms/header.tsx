"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "./desktop-navigation";
import Image from "next/image";

export default function Header() {
  return (
    <motion.header
      layoutScroll
      className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
    >
      <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 xl:w-80">
        <div className="hidden lg:flex">
          <Link href="/" aria-label="CMS Home">
            <span className="sr-only">FAIR-Aware</span>
            <div className="relative h-8 w-auto">
              <Image
                src="/fair-aware.svg"
                alt=""
                width={0}
                height={0}
                sizes="100vh"
                style={{ height: "100%", width: "auto" }}
              />
            </div>
          </Link>
        </div>
        <Navigation className="hidden lg:mt-10 lg:block" />
      </div>
    </motion.header>
  );
}
