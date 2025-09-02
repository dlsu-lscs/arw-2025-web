"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginBtn() {
  return (
    <>
      <motion.div
        animate={{ scale: [1, 1.02, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop" }}
        className="flex justify-center items-center gap-4"
      >
        <Image
          src={"/logos/google.svg"}
          alt="google logo"
          width={42}
          height={42}
        />
        <h1 className="sm:text-2xl text-base [text-shadow:4px_4px_0px_#000000] tracking-widest">
          Click anywhere to continue...
        </h1>
      </motion.div>
    </>
  );
}
