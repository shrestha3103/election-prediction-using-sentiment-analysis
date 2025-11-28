export type AnalysisType = 'regression' | 'sentiment';

// Data Types
export interface DataPoint {
  [key: string]: number | string;
}

// Regression Types
export interface RegressionResult {
  slope: number;
  intercept: number;
  regressionLine: {
    x: number;
    y: number;
    actual: number;
  }[];
}

// Sentiment Types
export interface SentimentResult {
  text: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  score: number;
}

// Component Props Types
export interface FileUploadProps {
  onFileUpload: (data: string) => void;
}

export interface AnalysisTypeSelectorProps {
  value: AnalysisType;
  onChange: (value: AnalysisType) => void;
}

export interface RegressionResultsProps {
  results: RegressionResult | null;
}

export interface SentimentResultsProps {
  results: SentimentResult[] | null;
}