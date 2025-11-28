import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const SentimentAnalysisSection = ({ partyMetrics }) => {
  if (!partyMetrics || Object.keys(partyMetrics).length === 0) {
    return null;
  }
  
  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle>Sentiment Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Party</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Tweets</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Positive Tweets</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Negative Tweets</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">P Value</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(partyMetrics).map(([party, metrics]) => (
                <tr key={party}>
                  <td className="px-6 py-4 whitespace-nowrap">{party}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{metrics.totalTweets}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{metrics.positiveTweets}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{metrics.negativeTweets}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{metrics.pValue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentAnalysisSection;