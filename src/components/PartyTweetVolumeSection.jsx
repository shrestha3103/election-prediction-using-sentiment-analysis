import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { parsePartyData } from '../utils/csvPartyDataParser';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PartyTweetVolumeSection = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedParties, setSelectedParties] = useState({
    TMC: true,
    BJP: true,
    INC: true,
    CPIM: true
  });
  
  const partyColors = {
    TMC: "#4CAF50", // green
    BJP: "#FF9800", // orange
    INC: "#03A9F4", // skyblue
    CPIM: "#F44336" // red
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedData = parsePartyData(e.target.result);
          
          // Format data for recharts
          const formattedData = parsedData.xValues.map((x, index) => {
            const dataPoint = { x };
            Object.keys(parsedData.parties).forEach(party => {
              dataPoint[party] = parsedData.parties[party][index];
            });
            return dataPoint;
          });
          
          setChartData({
            formattedData,
            xMin: Math.min(...parsedData.xValues),
            xMax: Math.max(...parsedData.xValues)
          });
        } catch (error) {
          console.error("Error parsing CSV:", error);
          alert("Error parsing CSV file. Please check the format.");
        }
      };
      reader.readAsText(file);
    }
  };
  
  const toggleParty = (party) => {
    setSelectedParties(prev => ({
      ...prev,
      [party]: !prev[party]
    }));
  };
  
  // Generate x-axis ticks similar to the Python code
  const generateXTicks = (min, max) => {
    const ticks = [];
    for (let i = Math.floor(min); i <= Math.ceil(max); i++) {
      ticks.push(i);
    }
    return ticks;
  };
  
  // Custom tick formatter to show only every 3rd label
  const formatXTick = (value) => {
    if ((value - 1) % 3 === 0) {
      return value;
    }
    return '';
  };
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="font-medium">X: {label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Party Tweet Volume Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label htmlFor="csv-file">Upload Party Tweet Volume CSV</Label>
            <input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="block w-full mt-2 text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              File should contain columns: X, TMC, BJP, INC, CPIM
            </p>
          </div>
          
          {chartData && (
            <>
              <div className="flex flex-wrap gap-2">
                {Object.keys(selectedParties).map(party => (
                  <Button
                    key={party}
                    variant={selectedParties[party] ? "default" : "outline"}
                    onClick={() => toggleParty(party)}
                    style={{ backgroundColor: selectedParties[party] ? partyColors[party] : undefined }}
                    className={!selectedParties[party] ? "border-2" : ""}
                  >
                    {party}
                  </Button>
                ))}
              </div>
              
              <div className="h-96 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData.formattedData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="x" 
                      type="number" 
                      domain={[chartData.xMin, chartData.xMax]} 
                      ticks={generateXTicks(chartData.xMin, chartData.xMax)}
                      tickFormatter={formatXTick}
                      label={{ value: "", position: "insideBottom", offset: -10 }}
                    />
                    <YAxis 
                      domain={[0, 8000]} 
                      ticks={[0, 2000, 4000, 6000, 8000]}
                      label={{ value: "Tweet Volume", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={36} />
                    
                    {Object.keys(selectedParties).map(party => (
                      selectedParties[party] && (
                        <Line
                          key={party}
                          type="monotone"
                          dataKey={party}
                          stroke={partyColors[party]}
                          name={party}
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6 }}
                        />
                      )
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium mb-2">Chart Summary</h3>
                <p>This chart shows tweet volume comparisons for different political parties across the range of X values.</p>
                <p className="mt-2 text-sm text-gray-600">
                  The data ranges from {chartData.xMin} to {chartData.xMax} on the X-axis, with tweet volumes displayed on the Y-axis.
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PartyTweetVolumeSection;