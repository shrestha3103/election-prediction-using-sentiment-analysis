import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const FileUploadSection = ({ parties, onFilesUploaded }) => {
  const [tweetFiles, setTweetFiles] = React.useState({});
  const [keywordFiles, setKeywordFiles] = React.useState({});
  
  const handleTweetFileChange = (party, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTweetFiles(prev => ({
          ...prev,
          [party]: e.target.result
        }));
      };
      reader.readAsText(file);
    }
  };
  
  const handleKeywordFileChange = (party, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setKeywordFiles(prev => ({
          ...prev,
          [party]: e.target.result
        }));
      };
      reader.readAsText(file);
    }
  };
  
  const handleAnalyzeClick = () => {
    onFilesUploaded({ tweetFiles, keywordFiles });
  };
  
  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle>Upload Tweet and Keyword Files</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {parties.map(party => (
            <div key={party} className="space-y-4 border p-4 rounded-md">
              <h3 className="font-medium text-lg">{party}</h3>
              
              <div className="space-y-2">
                <Label htmlFor={`${party}-tweets`}>Tweets CSV</Label>
                <input
                  id={`${party}-tweets`}
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleTweetFileChange(party, e)}
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`${party}-keywords`}>Positive Keywords CSV</Label>
                <input
                  id={`${party}-keywords`}
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleKeywordFileChange(party, e)}
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                />
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          className="mt-6"
          onClick={handleAnalyzeClick}
          disabled={parties.some(party => !tweetFiles[party] || !keywordFiles[party])}
        >
          Analyze All Parties
        </Button>
      </CardContent>
    </Card>
  );
};

export default FileUploadSection;