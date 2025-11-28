// import { polynomialRegression, evaluatePolynomial, formatPolynomialEquation } from './regressionAnalysis';

// export const performMultipleRegression = (dataPoints) => {
//   // Extract x and y values
//   const xValues = dataPoints.map(point => point.x);
//   const yValues = dataPoints.map(point => point.y);
  
//   // Polynomial regression of degree 2
//   const degree2Results = polynomialRegression(xValues, yValues, 2);
  
//   // Polynomial regression of degree 3
//   const degree3Results = polynomialRegression(xValues, yValues, 3);
  
//   // Create points for the regression curves
//   const minX = Math.min(...xValues);
//   const maxX = Math.max(...xValues);
//   const step = (maxX - minX) / 50;
  
//   const regressionCurveDegree2 = [];
//   const regressionCurveDegree3 = [];
  
//   for (let x = minX; x <= maxX; x += step) {
//     // Degree 2 polynomial value
//     const y2 = evaluatePolynomial(x, degree2Results.coefficients);
//     regressionCurveDegree2.push({ x, y: y2 });
    
//     // Degree 3 polynomial value
//     const y3 = evaluatePolynomial(x, degree3Results.coefficients);
//     regressionCurveDegree3.push({ x, y: y3 });
//   }
  
//   return {
//     dataPoints,
//     regressionCurveDegree2,
//     regressionCurveDegree3,
//     degree2: {
//       coefficients: degree2Results.coefficients,
//       rSquared: degree2Results.rSquared,
//       equation: formatPolynomialEquation(degree2Results.coefficients, 'x')
//     },
//     degree3: {
//       coefficients: degree3Results.coefficients,
//       rSquared: degree3Results.rSquared,
//       equation: formatPolynomialEquation(degree3Results.coefficients, 'x')
//     }
//   };
// };