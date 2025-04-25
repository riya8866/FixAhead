import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer 
      className="glass mt-12 py-6 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="container mx-auto">
        <div className="text-center text-gray-400 text-sm">
          <p>© 2025 FixAhead. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}
