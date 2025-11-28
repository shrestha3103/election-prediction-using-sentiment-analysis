import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatPolynomialEquation } from '../utils/regressionAnalysis';

const RegressionResultsSection = ({ regressionResults }) => {
  if (!regressionResults) {
    return (
      <Card className="w-full mt-8">
        <CardHeader>
          <CardTitle>Regression Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Submit vote share data to see regression results.</p>
        </CardContent>
      </Card>
    );
  }

  // Check if we have polynomial coefficients or linear regression results
  const isPolynomial = Array.isArray(regressionResults.coefficients);
  const degree = isPolynomial ? (regressionResults.coefficients.length - 1) : 1;
  
  // Extract relevant values
  const { slope, intercept, rSquared, dataPoints, regressionLine } = regressionResults;
  
  // Function to calculate predicted values based on regression type
  const calculatePredicted = (x) => {
    if (isPolynomial) {
      // Calculate polynomial value
      return regressionResults.coefficients.reduce((sum, coef, i) => {
        return sum + coef * Math.pow(x, i);
      }, 0);
    } else {
      // Calculate linear value
      return slope * x + intercept;
    }
  };

  // Convert dataPoints to format expected by recharts
  const chartData = dataPoints.map(point => ({
    x: point.x,
    actual: point.y,
    predicted: calculatePredicted(point.x)
  }));

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Regression Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-700">Regression Equation</h3>
            <p className="mt-2 text-lg">
              {isPolynomial
                ? formatPolynomialEquation(regressionResults.coefficients, degree)
                : formatPolynomialEquation(regressionResults)}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-700">
              {isPolynomial ? `Degree ${degree} Polynomial` : 'Linear Model'}
            </h3>
            <p className="mt-2 text-lg">
              {isPolynomial 
                ? `${degree} degree fit` 
                : `Slope: ${slope.toFixed(4)}`}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium text-purple-700">R-squared</h3>
            <p className="mt-2 text-lg">{(rSquared * 100).toFixed(2)}%</p>
          </div>
        </div>

        <div className="h-80 mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                type="number"
                label={{ value: "Sentiment Score", position: "insideBottom", offset: -5 }}
              />
              <YAxis
                label={{ value: "Vote Share %", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#8884d8"
                name="Actual Vote Share"
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#82ca9d"
                name="Predicted Vote Share"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Analysis Summary</h3>
          {isPolynomial ? (
            <p>
              The {degree}-degree polynomial regression shows a correlation between sentiment score and vote share.
              The model explains {(rSquared * 100).toFixed(2)}% of the variance in the data,
              which indicates a {rSquared > 0.7 ? "strong" : rSquared > 0.4 ? "moderate" : "weak"} relationship.
            </p>
          ) : (
            <>
              <p>
                The regression analysis shows a {slope > 0 ? "positive" : "negative"} correlation between sentiment score and vote share
                with a coefficient of {slope.toFixed(4)}.
              </p>
              <p className="mt-2">
                The model explains {(rSquared * 100).toFixed(2)}% of the variance in the data,
                which indicates a {rSquared > 0.7 ? "strong" : rSquared > 0.4 ? "moderate" : "weak"} relationship.
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegressionResultsSection;