/**
 * reportWebVitals.js - Module for reporting web vitals metrics.
 * This module defines a function that reports various web vitals metrics to the provided callback function.
 */

/**
 * Function for reporting web vitals metrics.
 * @param {Function} onPerfEntry - Callback function to receive web vitals metrics.
 */
 const reportWebVitals = onPerfEntry => {
  // Checking if onPerfEntry is a function and reporting web vitals metrics
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically importing web-vitals package
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Calling the provided callback function with each web vitals metric
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals; // Exporting the reportWebVitals function
