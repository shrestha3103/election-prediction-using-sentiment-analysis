import React, { useState } from 'react';
import { parseCSV } from '../utils/csvParser';
import { calculatePartyMetrics } from '../utils/sentimentAnalysis';
import { performRegression } from '../utils/regressionAnalysis';
import FileUploadSection from './FileUploadSection';
import SentimentAnalysisSection from './SentimentAnalysisSection';
import VoteShareInputSection from './VoteShareInputSection';
import RegressionResultsSection from './RegressionResultsSection';
import PartyTweetVolumeSection from './PartyTweetVolumeSection';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

const DataAnalysisApp = () => {
  const parties = ['Party 1', 'Party 2', 'Party 3', 'Party 4'];
  const [partyMetrics, setPartyMetrics] = useState({});
  const [regressionResults, setRegressionResults] = useState(null);
  const [analysisMode, setAnalysisMode] = useState('volume'); // Default to volume analysis
  
  const handleFilesUploaded = ({ tweetFiles, keywordFiles }) => {
    const metrics = {};
    
    for (const party of parties) {
      if (tweetFiles[party] && keywordFiles[party]) {
        const tweetData = parseCSV(tweetFiles[party]);
        const keywordData = parseCSV(keywordFiles[party]);
        metrics[party] = calculatePartyMetrics(tweetData, keywordData);
      }
    }
    
    setPartyMetrics(metrics);
  };
  
  const handleVoteShareSubmit = (dataPoints) => {
    const results = performRegression(dataPoints);
    setRegressionResults(results);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Political Data Analysis Tools</h1>
      
      <div className="mb-8">
        <RadioGroup 
          defaultValue="volume" 
          className="flex flex-row space-x-6 mb-6"
          value={analysisMode}
          onValueChange={setAnalysisMode}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="volume" id="volume" />
            <Label htmlFor="volume" className="font-medium">Party Tweet Volume</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sentiment" id="sentiment" />
            <Label htmlFor="sentiment" className="font-medium">Sentiment Analysis</Label>
          </div>
        </RadioGroup>
      </div>
      
      {analysisMode === 'sentiment' ? (
        <>
          <FileUploadSection
            parties={parties}
            onFilesUploaded={handleFilesUploaded}
          />
          
          <SentimentAnalysisSection
            partyMetrics={partyMetrics}
          />
          
          <VoteShareInputSection
            parties={parties}
            partyMetrics={partyMetrics}
            onVoteShareSubmit={handleVoteShareSubmit}
          />
          
          <RegressionResultsSection
            regressionResults={regressionResults}
          />
        </>
      ) : (
        <PartyTweetVolumeSection />
      )}
    </div>
  );
};

export default DataAnalysisApp;