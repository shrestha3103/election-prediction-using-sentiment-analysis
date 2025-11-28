// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Button } from "./ui/button";
// import { Label } from "./ui/label";
// import { parseCSV } from '../utils/csvParser';
// import { performMultipleRegression } from '../utils/numericRegressionAnalysis';
// import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label as ChartLabel } from 'recharts';

// const NumericRegressionSection = () => {
//   const [csvData, setCsvData] = useState(null);
//   const [columns, setColumns] = useState([]);
//   const [selectedXColumn, setSelectedXColumn] = useState('');
//   const [selectedYColumn, setSelectedYColumn] = useState('');
//   const [regressionResults, setRegressionResults] = useState(null);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const data = parseCSV(e.target.result);
//         setCsvData(data);
        
//         // Extract column names from the first row
//         if (data.length > 0) {
//           const cols = Object.keys(data[0]);
//           setColumns(cols);
//           if (cols.length >= 2) {
//             setSelectedXColumn(cols[0]);
//             setSelectedYColumn(cols[1]);
//           }
//         }
//       };
//       reader.readAsText(file);
//     }
//   };
  
//   const handleAnalyzeClick = () => {
//     if (csvData && selectedXColumn && selectedYColumn) {
//       // Extract x and y values
//       const dataPoints = csvData.map(row => ({
//         x: parseFloat(row[selectedXColumn]) || 0,
//         y: parseFloat(row[selectedYColumn]) || 0
//       })).filter(point => !isNaN(point.x) && !isNaN(point.y));
      
//       const results = performMultipleRegression(dataPoints);
//       setRegressionResults(results);
//     }
//   };
  
//   // Custom tooltip component
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       const data = payload[0].payload;
//       return (
//         <div className="bg-white p-4 border rounded shadow">
//           <p>{selectedXColumn}: {data.x.toFixed(2)}</p>
//           <p>{selectedYColumn}: {data.y.toFixed(2)}</p>
//         </div>
//       );
//     }
//     return null;
//   };
  
//   return (
//     <div className="space-y-8">
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Numeric Data Regression Analysis</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-6">
//             <div>
//               <Label htmlFor="csv-file">Upload CSV File with Numeric Data</Label>
//               <input
//                 id="csv-file"
//                 type="file"
//                 accept=".csv"
//                 onChange={handleFileUpload}
//                 className="block w-full mt-2 text-sm text-slate-500
//                   file:mr-4 file:py-2 file:px-4
//                   file:rounded-full file:border-0
//                   file:text-sm file:font-semibold
//                   file:bg-violet-50 file:text-violet-700
//                   hover:file:bg-violet-100"
//               />
//             </div>
            
//             {columns.length > 0 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="x-column">Select X-Axis (Independent Variable)</Label>
//                   <select
//                     id="x-column"
//                     value={selectedXColumn}
//                     onChange={(e) => setSelectedXColumn(e.target.value)}
//                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
//                   >
//                     {columns.map(col => (
//                       <option key={col} value={col}>{col}</option>
//                     ))}
//                   </select>
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="y-column">Select Y-Axis (Dependent Variable)</Label>
//                   <select
//                     id="y-column"
//                     value={selectedYColumn}
//                     onChange={(e) => setSelectedYColumn(e.target.value)}
//                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
//                   >
//                     {columns.map(col => (
//                       <option key={col} value={col}>{col}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}
            
//             <Button
//               onClick={handleAnalyzeClick}
//               disabled={!csvData || !selectedXColumn || !selectedYColumn}
//             >
//               Analyze Relationship
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
      
//       {regressionResults && (
//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle>Regression Results</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <p className="font-medium">
//                   Regression Equation: {selectedYColumn} = {regressionResults.slope.toFixed(4)} × {selectedXColumn} + {regressionResults.intercept.toFixed(4)}
//                 </p>
//                 <p>R² (Coefficient of Determination): {regressionResults.rSquared.toFixed(4)}</p>
//                 <p className="text-sm text-gray-600 mt-1">
//                   {regressionResults.rSquared > 0.7 ? 
//                     `Strong correlation between ${selectedXColumn} and ${selectedYColumn}.` :
//                     regressionResults.rSquared > 0.3 ? 
//                       `Moderate correlation between ${selectedXColumn} and ${selectedYColumn}.` :
//                       `Weak correlation between ${selectedXColumn} and ${selectedYColumn}.`
//                   }
//                 </p>
//               </div>
              
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <ScatterChart
//                     margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis 
//                       type="number" 
//                       dataKey="x"
//                       name={selectedXColumn}
//                     >
//                       <ChartLabel value={selectedXColumn} position="bottom" offset={10} />
//                     </XAxis>
//                     <YAxis 
//                       type="number" 
//                       dataKey="y"
//                       name={selectedYColumn}
//                     >
//                       <ChartLabel value={selectedYColumn} angle={-90} position="left" offset={0} />
//                     </YAxis>
//                     <Tooltip content={<CustomTooltip />} />
//                     <Legend />
//                     <Scatter
//                       name="Data Points"
//                       data={regressionResults.dataPoints}
//                       fill="#8884d8"
//                     />
//                     {/* Use direct ReCharts components rather than Line */}
//                     <Scatter
//                       name="Regression Line"
//                       data={regressionResults.regressionLine}
//                       fill="none"
//                       line={{ stroke: '#82ca9d', strokeWidth: 3 }}
//                       lineType="fitting"
//                       shape="none"
//                       legendType="line"
//                       isAnimationActive={false}
//                     />
//                   </ScatterChart>
//                 </ResponsiveContainer>
//               </div>
              
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statistic</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     <tr>
//                       <td className="px-6 py-4 whitespace-nowrap">Number of observations</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{regressionResults.dataPoints.length}</td>
//                     </tr>
//                     <tr>
//                       <td className="px-6 py-4 whitespace-nowrap">Correlation coefficient (r)</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{Math.sqrt(regressionResults.rSquared).toFixed(4)}</td>
//                     </tr>
//                     <tr>
//                       <td className="px-6 py-4 whitespace-nowrap">R² value</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{regressionResults.rSquared.toFixed(4)}</td>
//                     </tr>
//                     <tr>
//                       <td className="px-6 py-4 whitespace-nowrap">Slope</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{regressionResults.slope.toFixed(4)}</td>
//                     </tr>
//                     <tr>
//                       <td className="px-6 py-4 whitespace-nowrap">Intercept</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{regressionResults.intercept.toFixed(4)}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default NumericRegressionSection;