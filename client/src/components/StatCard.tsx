import { motion } from "framer-motion";

interface StatCardProps {
  icon: string;
  value: string;
  description: string;
  delay?: number;
}

export default function StatCard({ icon, value, description, delay = 0 }: StatCardProps) {
  return (
    <motion.div 
      className="stat-card glass rounded-xl p-8 text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        type: "spring",
        stiffness: 100 
      }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 12px 28px rgba(0, 0, 0, 0.3)"
      }}
    >
      <span className="material-icons text-secondary text-5xl mb-4">{icon}</span>
      <h3 className="text-3xl font-bold mb-2">{value}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}
