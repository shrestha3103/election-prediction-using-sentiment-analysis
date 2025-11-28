import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const VoteShareInputSection = ({ parties, partyMetrics, onVoteShareSubmit }) => {
  const [voteShares, setVoteShares] = React.useState({});
  
  const handleVoteShareChange = (party, value) => {
    setVoteShares(prev => ({
      ...prev,
      [party]: parseFloat(value) || 0
    }));
  };
  
  const handleSubmit = () => {
    // Prepare data points for regression
    const dataPoints = parties.map(party => ({
      party,
      x: partyMetrics[party]?.pValue || 0,
      y: voteShares[party] || 0
    }));
    
    onVoteShareSubmit(dataPoints);
  };
  
  if (!partyMetrics || Object.keys(partyMetrics).length === 0) {
    return null;
  }
  
  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle>Enter Vote Share Percentages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {parties.map(party => (
            <div key={party} className="space-y-2">
              <Label htmlFor={`${party}-vote-share`}>{party} Vote Share (%)</Label>
              <input
                id={`${party}-vote-share`}
                type="number"
                min="0"
                max="100"
                step="0.1"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={voteShares[party] || ''}
                onChange={(e) => handleVoteShareChange(party, e.target.value)}
              />
            </div>
          ))}
        </div>
        
        <Button 
          className="mt-6"
          onClick={handleSubmit}
          disabled={parties.some(party => voteShares[party] === undefined)}
        >
          Analyze Correlation
        </Button>
      </CardContent>
    </Card>
  );
};

export default VoteShareInputSection;