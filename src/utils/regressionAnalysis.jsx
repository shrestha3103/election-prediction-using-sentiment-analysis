// src/utils/regressionAnalysis.js
export const performRegression = (dataPoints) => {
  // Extract x and y values
  const xValues = dataPoints.map(point => point.x);
  const yValues = dataPoints.map(point => point.y);
  
  // Calculate means
  const n = xValues.length;
  const meanX = xValues.reduce((sum, x) => sum + x, 0) / n;
  const meanY = yValues.reduce((sum, y) => sum + y, 0) / n;
  
  // Calculate slope and intercept
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < n; i++) {
    numerator += (xValues[i] - meanX) * (yValues[i] - meanY);
    denominator += Math.pow(xValues[i] - meanX, 2);
  }
  
  const slope = denominator !== 0 ? numerator / denominator : 0;
  const intercept = meanY - slope * meanX;
  
  // Calculate R-squared
  const yPredicted = xValues.map(x => slope * x + intercept);
  
  let ssResidual = 0;
  let ssTotal = 0;
  
  for (let i = 0; i < n; i++) {
    ssResidual += Math.pow(yValues[i] - yPredicted[i], 2);
    ssTotal += Math.pow(yValues[i] - meanY, 2);
  }
  
  const rSquared = ssTotal !== 0 ? 1 - (ssResidual / ssTotal) : 0;
  
  // Create regression line data
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  
  const regressionLine = [
    { x: minX, y: slope * minX + intercept },
    { x: maxX, y: slope * maxX + intercept }
  ];
  
  return {
    slope,
    intercept,
    rSquared,
    dataPoints,
    regressionLine
  };
};

// Support for polynomial regression formatting
export const formatPolynomialEquation = (coefficients, degree = 1) => {
  // Handle the new structure for linear regression
  if (!Array.isArray(coefficients) && typeof coefficients === 'object' && 'slope' in coefficients) {
    const { slope, intercept } = coefficients;
    
    // Format linear equation (y = mx + b)
    let equation = 'y = ';
    
    if (slope !== 0) {
      equation += slope.toFixed(4) + 'x';
      
      if (intercept > 0) {
        equation += ' + ' + intercept.toFixed(4);
      } else if (intercept < 0) {
        equation += ' - ' + Math.abs(intercept).toFixed(4);
      }
    } else {
      equation += intercept.toFixed(4);
    }
    
    return equation;
  }
  
  // Original polynomial equation formatting for degree 2 and 3
  if (Array.isArray(coefficients)) {
    let equation = 'y = ';
    let terms = [];
    
    // Loop through coefficients in reverse order
    // (from highest degree to constant term)
    for (let i = degree; i >= 0; i--) {
      const coef = coefficients[i];
      
      // Skip zero coefficients
      if (coef === 0) continue;
      
      if (i === 0) {
        // Constant term
        if (coef > 0 && terms.length > 0) {
          terms.push('+ ' + coef.toFixed(4));
        } else if (coef < 0) {
          terms.push('- ' + Math.abs(coef).toFixed(4));
        } else {
          terms.push(coef.toFixed(4));
        }
      } else if (i === 1) {
        // x term
        if (coef === 1) {
          terms.push(terms.length > 0 ? '+ x' : 'x');
        } else if (coef === -1) {
          terms.push('- x');
        } else if (coef > 0) {
          terms.push(terms.length > 0 ? '+ ' + coef.toFixed(4) + 'x' : coef.toFixed(4) + 'x');
        } else {
          terms.push('- ' + Math.abs(coef).toFixed(4) + 'x');
        }
      } else {
        // Higher degree terms
        if (coef === 1) {
          terms.push(terms.length > 0 ? '+ x^' + i : 'x^' + i);
        } else if (coef === -1) {
          terms.push('- x^' + i);
        } else if (coef > 0) {
          terms.push(terms.length > 0 ? '+ ' + coef.toFixed(4) + 'x^' + i : coef.toFixed(4) + 'x^' + i);
        } else {
          terms.push('- ' + Math.abs(coef).toFixed(4) + 'x^' + i);
        }
      }
    }
    
    return equation + terms.join(' ');
  }
  
  return 'No regression data available';
};