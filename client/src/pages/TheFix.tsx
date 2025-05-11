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
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          AI-Powered Detection for Safer Roads
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Our cutting-edge YOLOv11 model transforms road maintenance by
          detecting damage early, accurately, and efficiently—enabling proactive
          repairs that save costs and improve safety.
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
        <h3 className="text-2xl font-bold mb-10 text-center">
          How Our AI Detection Works
        </h3>

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
                <h4 className="text-xl font-semibold text-accent mb-2">
                  1. Data Collection
                </h4>
                <p className="text-gray-300">
                  Images and videos are collected through mobile uploads,
                  dashcams, or traffic cameras, creating a continuous stream of
                  road condition data.
                </p>
              </div>
              <div className="md:w-12 h-12 bg-secondary rounded-full flex items-center justify-center z-10 my-4 md:my-0">
                <span className="material-icons text-white">filter_1</span>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <motion.img
                  src="data:image/jpeg;base64,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"
                  alt="Data collection through cameras"
                  className="rounded-lg shadow-lg w-full max-h-[200px] object-cover"
                  whileInView={{
                    scale: [1, 1.05, 1],
                    transition: { duration: 1, times: [0, 0.5, 1] },
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
                <h4 className="text-xl font-semibold text-accent mb-2">
                  2. AI Processing
                </h4>
                <p className="text-gray-300">
                  Our YOLOv11 model analyzes images in real-time, identifying
                  and classifying road damage with over 95% accuracy, even in
                  challenging conditions.
                </p>
              </div>
              <div className="md:w-12 h-12 bg-secondary rounded-full flex items-center justify-center z-10 my-4 md:my-0">
                <span className="material-icons text-white">filter_2</span>
              </div>
              <div className="md:w-1/2 md:pr-12">
                <motion.img
                  src="https://cdn.analyticsvidhya.com/wp-content/uploads/2024/10/YOLOv11.webp"
                  alt="AI Processing"
                  className="rounded-lg shadow-lg w-full max-h-[200px] object-cover"
                  whileInView={{
                    scale: [1, 1.05, 1],
                    transition: { duration: 1, times: [0, 0.5, 1] },
                  }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="flex flex-col md:flex-row items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 text-right">
                <h4 className="text-xl font-semibold text-accent mb-2">
                  3. Results
                </h4>
                <p className="text-gray-300">
                  The processed data is visualized on an intuitive dashboard,
                  providing actionable insights for road maintenance teams to
                  prioritize and address issues efficiently.
                </p>
              </div>
              <div className="md:w-12 h-12 bg-secondary rounded-full flex items-center justify-center z-10 my-4 md:my-0">
                <span className="material-icons text-white">filter_3</span>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <motion.img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHAoXLkoi4d0FnmAm8L2Eot5HLt_UkVHrU0w&s"
                  alt="Results visualization"
                  className="rounded-lg shadow-lg w-full max-h-[200px] object-cover"
                  whileInView={{
                    scale: [1, 1.05, 1],
                    transition: { duration: 1, times: [0, 0.5, 1] },
                  }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
