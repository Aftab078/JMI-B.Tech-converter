import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Award, Info } from 'lucide-react';

function App() {
  const [cpi, setCpi] = useState<string>('');
  const [percentage, setPercentage] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // Function to convert CPI to percentage using the given formula
  const convertCpiToPercentage = (cpi: number): number => {
    // Y% = 137.4 - 44.24X + 6.96X² - 0.29X³
    return 137.4 - (44.24 * cpi) + (6.96 * Math.pow(cpi, 2)) - (0.29 * Math.pow(cpi, 3));
  };

  useEffect(() => {
    if (cpi === '') {
      setPercentage(null);
      setError('');
      return;
    }

    const cpiValue = parseFloat(cpi);
    
    if (isNaN(cpiValue)) {
      setPercentage(null);
      setError('Please enter a valid number');
      return;
    }

    if (cpiValue < 0 || cpiValue > 10) {
      setPercentage(null);
      setError('CPI must be between 0 and 10');
      return;
    }

    const calculatedPercentage = convertCpiToPercentage(cpiValue);
    setPercentage(parseFloat(calculatedPercentage.toFixed(2)));
    setError('');
  }, [cpi]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpi(e.target.value);
  };

  // Static date
  const fixedDate = "25 February 2025"; // Fixed date as per your requirement

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md border border-gray-100"
      >
        <motion.div 
          className="flex flex-col items-center justify-center mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.img 
            src="https://vendotic.com/public/uploads/small/jamia-millia-islamia-logo-hd-png-vector-free-download-121.png" 
            alt="Jamia Millia Islamia Logo" 
            className="h-28 mb-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.h1 
            className="text-2xl font-bold text-center text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Jamia Millia Islamia
          </motion.h1>
        </motion.div>
        
        <motion.div 
          className="border-t border-b border-gray-200 py-4 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-center text-gray-700 flex items-center justify-center">
            <Calculator className="h-5 w-5 mr-2 text-green-600" />
            CPI to Percentage Converter
          </h2>
          <p className="text-sm text-center text-gray-600 mt-1">
            For B.Tech. Final Year Examination (w.e.f. Session 2021-22)
          </p>
        </motion.div>

        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <label htmlFor="cpi" className="block text-sm font-medium text-gray-700 mb-1">
            Enter your CPI (0-10)
          </label>
          <motion.input
            type="text"
            id="cpi"
            value={cpi}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
            placeholder="Enter CPI value"
            whileFocus={{ scale: 1.01 }}
          />
          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1 text-sm text-red-600"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {percentage !== null && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-md p-5 mb-6"
            >
              <div className="flex items-center">
                <Award className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-medium text-green-800">Equivalent Percentage:</h3>
              </div>
              <motion.p 
                className="text-4xl font-bold text-green-700 mt-2 text-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                {percentage}%
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="relative bg-gray-50 p-4 rounded-md border border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-semibold text-gray-700">Formula Details</h4>
            <motion.button
              onClick={() => setShowInfo(!showInfo)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-blue-500 hover:text-blue-700"
            >
              <Info className="h-5 w-5" />
            </motion.button>
          </div>
          
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 text-sm text-gray-600 bg-white p-3 rounded border border-gray-200"
              >
                <p>This formula has been officially approved by the Controller of Examinations for converting CPI to percentage for B.Tech. Final Year students from the 2021-22 session onwards.</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <p className="text-sm text-gray-600 mt-2">
            <strong>Formula:</strong> Y% = 137.4 - 44.24X + 6.96X² - 0.29X³
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Where X is the CPI of the student.
          </p>
        </motion.div>

        <motion.div 
          className="mt-6 text-right text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p>Date: {fixedDate}</p> {/* Static date displayed here */}
          <p className="font-semibold">Controller of Examinations</p>
        </motion.div>
      </motion.div>
      
      <motion.p 
        className="text-xs text-gray-500 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        © 2025 Jamia Millia Islamia. All rights reserved.
      </motion.p>
    </div>
  );
}

export default App;