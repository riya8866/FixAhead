import { motion } from "framer-motion";
import StatCard from "@/components/StatCard";

export default function WhyItMatters() {
  return (
    <motion.section 
      id="why-it-matters" 
      className="space-y-12 pt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.div 
        className="text-center max-w-4xl mx-auto mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Road Damage is More Than Just a Bump in the Road</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Potholes and road damage cost billions in vehicle repairs, cause accidents, and reduce the efficiency of our transportation infrastructure. 
          Traditional detection methods are slow, labor-intensive, and often reactive rather than preventative.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard 
          icon="attach_money"
          value="$26.5 Billion"
          description="Annual cost of vehicle damage from poor road conditions in the US alone"
          delay={0.1}
        />
        <StatCard 
          icon="dangerous"
          value="33%"
          description="Of all traffic accidents involve poor road conditions as a contributing factor"
          delay={0.2}
        />
        <StatCard 
          icon="schedule"
          value="14-21 Days"
          description="Average time between pothole reporting and repair using traditional methods"
          delay={0.3}
        />
      </div>

      {/* Image with Text */}
      <motion.div 
        className="flex flex-col lg:flex-row items-center gap-12 my-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="lg:w-1/2">
          <motion.img 
            src="https://images.unsplash.com/photo-1621636611426-5b4cfe2baa8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Damaged road with multiple potholes" 
            className="rounded-xl shadow-lg w-full h-auto object-cover max-h-[400px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
        </div>
        <div className="lg:w-1/2 space-y-6">
          <motion.h3 
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            The Hidden Costs of Road Damage
          </motion.h3>
          <motion.p 
            className="text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Beyond vehicle damage, potholes contribute to increased fuel consumption, longer travel times, and accelerated wear on public transportation. 
            The environmental impact of congestion caused by road damage adds an additional layer of costs that are rarely calculated.
          </motion.p>
          <motion.div 
            className="glass rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-xl mb-3 text-accent">Did You Know?</h4>
            <p className="text-gray-300">
              Every dollar invested in preventative road maintenance saves between $4-$10 in future repair costs.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Traditional Methods Section */}
      <motion.div 
        className="glass rounded-xl p-8 my-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-6 text-center">Traditional Detection Methods: Why They Fall Short</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="material-icons text-4xl text-accent">schedule</span>
            <h4 className="text-xl font-semibold">Time-Consuming</h4>
            <p className="text-gray-300">Manual inspections require significant time and resources, resulting in delayed response times.</p>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="material-icons text-4xl text-accent">person</span>
            <h4 className="text-xl font-semibold">Labor-Intensive</h4>
            <p className="text-gray-300">Relies heavily on human observers who can miss damage or misjudge severity.</p>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="material-icons text-4xl text-accent">bolt</span>
            <h4 className="text-xl font-semibold">Reactive, Not Proactive</h4>
            <p className="text-gray-300">Most damage is only addressed after it becomes severe, missing the opportunity for early intervention.</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
