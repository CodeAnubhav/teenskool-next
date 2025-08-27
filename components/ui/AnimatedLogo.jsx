"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import logoUrl from "@/public/assets/TS.png";

export default function AnimatedLogo() {
  return (
    <Link href="/">
      <motion.div whileHover={{ scale: 1.05 }}>
        <Image
          src={logoUrl}
          alt="TeenSkool Logo"
          height={48} // h-12
          className="w-auto"
        />
      </motion.div>
    </Link>
  );
}