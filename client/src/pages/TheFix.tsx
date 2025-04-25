import { motion } from "framer-motion";

export default function TheFix() {
  return (
    <motion.section 
      id="the-fix" 
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
        <h2 className="text-4xl md:text-5xl font-bold mb-6">AI-Powered Detection for Safer Roads</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Our cutting-edge YOLOv11 model transforms road maintenance by detecting damage early, accurately, and efficiently—enabling proactive repairs that save costs and improve safety.
        </p>
      </motion.div>

      {/* How It Works Steps */}
      <motion.div 
        className="glass rounded-xl p-8 my-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-10 text-center">How Our AI Detection Works</h3>
        
        <div className="relative">
          {/* Steps Timeline */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-secondary-dark transform -translate-x-1/2"></div>
          
          <div className="space-y-20">
            {/* Step 1 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 text-right">
                <h4 className="text-xl font-semibold text-accent mb-2">1. Data Collection</h4>
                <p className="text-gray-300">Images and videos are collected through mobile uploads, dashcams, or traffic cameras, creating a continuous stream of road condition data.</p>
              </div>
              <div className="md:w-12 h-12 bg-secondary rounded-full flex items-center justify-center z-10 my-4 md:my-0">
                <span className="material-icons text-white">filter_1</span>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <motion.img 
                  src="https://images.unsplash.com/photo-1582729864530-95ef2e74237d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Data collection through cameras" 
                  className="rounded-lg shadow-lg w-full max-h-[200px] object-cover"
                  whileInView={{ 
                    scale: [1, 1.05, 1],
                    transition: { duration: 1, times: [0, 0.5, 1] }
                  }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div 
              className="flex flex-col md:flex-row-reverse items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 text-left">
                <h4 className="text-xl font-semibold text-accent mb-2">2. AI Processing</h4>
                <p className="text-gray-300">Our YOLOv11 model analyzes images in real-time, identifying and classifying road damage with over 95% accuracy, even in challenging conditions.</p>
              </div>
              <div className="md:w-12 h-12 bg-secondary rounded-full flex items-center justify-center z-10 my-4 md:my-0">
                <span className="material-icons text-white">filter_2</span>
              </div>
              <div className="md:w-1/2 md:pr-12">
                <motion.div 
                  className="glass rounded-lg p-5 border border-secondary-dark"
                  initial={{ opacity: 0.5 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <code className="font-mono text-xs text-gray-300 block whitespace-pre">
<span className="text-accent-light">// AI Model Processing</span>
{`async function detectPotholes(imageData, model) {
  const predictions = await model.detect(imageData);
  
  return predictions.filter(pred => 
    pred.confidence > 0.75
  ).map(pred => ({
    box: pred.bbox,
    confidence: pred.confidence,
    severity: calculateSeverity(pred)
  }));
}`}
                  </code>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 text-right">
                <h4 className="text-xl font-semibold text-accent mb-2">3. Damage Analysis</h4>
                <p className="text-gray-300">Our system categorizes damage by type and severity, prioritizing repairs based on safety impact and estimating repair costs.</p>
              </div>
              <div className="md:w-12 h-12 bg-secondary rounded-full flex items-center justify-center z-10 my-4 md:my-0">
                <span className="material-icons text-white">filter_3</span>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <motion.div 
                  className="glass rounded-lg overflow-hidden"
                  whileInView={{ 
                    y: [5, -5, 0],
                    transition: { duration: 1, times: [0, 0.5, 1] }
                  }}
                  viewport={{ once: true }}
                >
                  <div className="p-3 bg-primary-light border-b border-primary-dark flex justify-between items-center">
                    <span className="font-medium">Damage Assessment Report</span>
                    <span className="material-icons text-accent text-sm">analytics</span>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Damage Type:</span>
                      <span className="font-medium">Pothole (Class 2)</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Area:</span>
                      <span className="font-medium">1.3 sq. meters</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Severity:</span>
                      <span className="font-medium text-yellow-500">Medium</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Repair Priority:</span>
                      <span className="font-medium text-orange-500">High</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Step 4 */}
            <motion.div 
              className="flex flex-col md:flex-row-reverse items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 text-left">
                <h4 className="text-xl font-semibold text-accent mb-2">4. Action & Monitoring</h4>
                <p className="text-gray-300">Results are sent to maintenance crews with precise GPS locations, enabling efficient repair planning and ongoing monitoring for damage recurrence.</p>
              </div>
              <div className="md:w-12 h-12 bg-secondary rounded-full flex items-center justify-center z-10 my-4 md:my-0">
                <span className="material-icons text-white">filter_4</span>
              </div>
              <div className="md:w-1/2 md:pr-12">
                <motion.img 
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Road repair crew working" 
                  className="rounded-lg shadow-lg w-full max-h-[200px] object-cover"
                  whileInView={{ 
                    scale: [1, 1.05, 1],
                    transition: { duration: 1, times: [0, 0.5, 1] }
                  }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Before/After Comparison */}
      <motion.div 
        className="my-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-8 text-center">See the Difference</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="glass rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-primary-light p-3 border-b border-primary-dark">
              <h4 className="font-semibold">Traditional Detection</h4>
            </div>
            <div className="p-5 space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1597421664073-9485ef5a5550?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Manual inspection of road damage" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="space-y-2">
                <div className="flex items-center text-red-400">
                  <span className="material-icons mr-2 text-sm">schedule</span>
                  <p className="text-sm">Detection Time: 2-5 days</p>
                </div>
                <div className="flex items-center text-red-400">
                  <span className="material-icons mr-2 text-sm">error</span>
                  <p className="text-sm">Accuracy: ~65%</p>
                </div>
                <div className="flex items-center text-red-400">
                  <span className="material-icons mr-2 text-sm">payments</span>
                  <p className="text-sm">Cost: $450-600 per mile</p>
                </div>
                <div className="flex items-center text-red-400">
                  <span className="material-icons mr-2 text-sm">category</span>
                  <p className="text-sm">Classification: Manual assessment</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="glass rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-primary-light p-3 border-b border-primary-dark">
              <h4 className="font-semibold">AI-Powered Detection</h4>
            </div>
            <div className="p-5 space-y-4">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1597421664073-9485ef5a5550?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="AI detecting road damage" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                {/* AI detection boxes */}
                <motion.div 
                  className="absolute top-10 left-20 w-24 h-16 bounding-box rounded-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                />
                <motion.div 
                  className="absolute top-[80px] right-[100px] w-20 h-14 bounding-box rounded-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                />
                
                <motion.div 
                  className="absolute top-[15px] left-[85px] bg-black bg-opacity-70 rounded px-2 py-1 text-xs"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Pothole: 96%
                </motion.div>
                <motion.div 
                  className="absolute top-[85px] right-[125px] bg-black bg-opacity-70 rounded px-2 py-1 text-xs"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  Crack: 89%
                </motion.div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-green-400">
                  <span className="material-icons mr-2 text-sm">schedule</span>
                  <p className="text-sm">Detection Time: Real-time</p>
                </div>
                <div className="flex items-center text-green-400">
                  <span className="material-icons mr-2 text-sm">check_circle</span>
                  <p className="text-sm">Accuracy: &gt;95%</p>
                </div>
                <div className="flex items-center text-green-400">
                  <span className="material-icons mr-2 text-sm">payments</span>
                  <p className="text-sm">Cost: $50-80 per mile</p>
                </div>
                <div className="flex items-center text-green-400">
                  <span className="material-icons mr-2 text-sm">category</span>
                  <p className="text-sm">Classification: 6 damage types with severity</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div 
        className="my-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-8 text-center">Key Benefits</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            className="glass rounded-xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <span className="material-icons text-accent text-3xl mb-4">timelapse</span>
            <h4 className="font-semibold mb-2">Early Detection</h4>
            <p className="text-sm text-gray-300">Identify issues before they develop into costly problems</p>
          </motion.div>
          
          <motion.div 
            className="glass rounded-xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <span className="material-icons text-accent text-3xl mb-4">savings</span>
            <h4 className="font-semibold mb-2">Cost Reduction</h4>
            <p className="text-sm text-gray-300">Save up to 70% on road maintenance through early intervention</p>
          </motion.div>
          
          <motion.div 
            className="glass rounded-xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <span className="material-icons text-accent text-3xl mb-4">speed</span>
            <h4 className="font-semibold mb-2">Faster Response</h4>
            <p className="text-sm text-gray-300">Cut average repair time from weeks to days</p>
          </motion.div>
          
          <motion.div 
            className="glass rounded-xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <span className="material-icons text-accent text-3xl mb-4">insights</span>
            <h4 className="font-semibold mb-2">Data-Driven Planning</h4>
            <p className="text-sm text-gray-300">Prioritize repairs based on objective severity and impact analysis</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
