export const calculatePartyMetrics = (tweetData, keywordData) => {
  // Extract all keywords from the keyword CSV
  const allPositiveKeywords = [];
  Object.keys(keywordData[0] || {}).forEach(col => {
    keywordData.forEach(row => {
      if (row[col] && row[col] !== 'nan') {
        const keywords = row[col].toLowerCase().split(/[,|;]/).map(kw => kw.trim());
        keywords.forEach(kw => {
          if (kw && !allPositiveKeywords.includes(kw)) {
            allPositiveKeywords.push(kw);
          }
        });
      }
    });
  });

  // Count positive tweets
  const positiveTweets = [];
  let totalTweets = 0;

  const tweetColumn = Object.keys(tweetData[0] || {})[0]; // Get the first column name
  
  if (tweetData && tweetData.length > 0 && tweetColumn) {
    totalTweets = tweetData.length;
    
    tweetData.forEach(row => {
      const tweetText = row[tweetColumn]?.toLowerCase() || '';
      const hasPositiveKeyword = allPositiveKeywords.some(keyword => 
        tweetText.includes(keyword)
      );
      
      if (hasPositiveKeyword) {
        positiveTweets.push({
          ...row,
          hasPositiveKeyword: true
        });
      }
    });
  }

  // Calculate n, n1, n2 values
  const n = totalTweets;
  const n1 = positiveTweets.length;
  const n2 = n - n1;
  
  // Calculate P value using the formula P = w1*n1 + w*n + w2*n2
  const w1 = 0.6;
  const w = 0.1;
  const w2 = 0.3;
  
  const p = (w1 * n1) + (w * n) + (w2 * n2);
  
  return {
    totalTweets: n,
    positiveTweets: n1,
    negativeTweets: n2,
    pValue: p,
    positiveKeywords: allPositiveKeywords,
    positiveTweetsList: positiveTweets
  };
};