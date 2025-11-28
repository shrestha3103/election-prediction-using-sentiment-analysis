// import React from 'react';
// import { Card } from './ui/card';
// import { Label } from './ui/label';

// const AnalysisTypeSelector = ({ selectedType, onTypeChange }) => {
//   return (
//     <Card className="p-6 shadow-md">
//       <div className="space-y-4">
//         <h2 className="text-xl font-semibold">Select Analysis Type</h2>
        
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex items-center space-x-2">
//             <input
//               type="radio"
//               id="regression"
//               name="analysisType"
//               value="regression"
//               checked={selectedType === 'regression'}
//               onChange={() => onTypeChange('regression')}
//               className="h-4 w-4 text-blue-600"
//             />
//             <Label htmlFor="regression" className="font-medium">
//               Regression Analysis
//             </Label>
//           </div>
          
//           <div className="flex items-center space-x-2">
//             <input
//               type="radio"
//               id="sentiment"
//               name="analysisType"
//               value="sentiment"
//               checked={selectedType === 'sentiment'}
//               onChange={() => onTypeChange('sentiment')}
//               className="h-4 w-4 text-blue-600"
//             />
//             <Label htmlFor="sentiment" className="font-medium">
//               Sentiment Analysis
//             </Label>
//           </div>
//         </div>
        
//         <div className="text-sm text-slate-500">
//           {selectedType === 'regression' ? (
//             <p>Upload a CSV file with numeric data for regression analysis.</p>
//           ) : (
//             <p>Upload tweet and keyword files for 4 political parties to analyze sentiment and correlation with vote share.</p>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default AnalysisTypeSelector;