import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer 
      className="glass mt-12 py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
              <span className="material-icons text-xl">speed</span>
            </div>
            <h2 className="text-xl font-bold">Fix<span className="text-accent">Ahead</span></h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">About</a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">Documentation</a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">Privacy</a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">Contact</a>
          </div>
          
          <div className="flex gap-4">
            <a href="https://github.com/" className="text-gray-300 hover:text-white transition duration-300" aria-label="GitHub repository">
              <span className="material-icons">code</span>
            </a>
            <a href="mailto:info@fixahead.com" className="text-gray-300 hover:text-white transition duration-300" aria-label="Email us">
              <span className="material-icons">email</span>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300" aria-label="Help center">
              <span className="material-icons">help</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© 2023 FixAhead. All rights reserved. Built with React and TailwindCSS.</p>
          <p className="mt-2">This is a demo application. AI model integration placeholders included.</p>
        </div>
      </div>
    </motion.footer>
  );
}
