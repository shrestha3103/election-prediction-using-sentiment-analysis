export const parsePartyData = (csvContent) => {
  // Split by lines and get header
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');
  
  // Initialize data structure
  const result = {
    xValues: [],
    parties: {
      TMC: [],
      BJP: [],
      INC: [],
      CPIM: []
    }
  };
  
  // Parse each line
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const rowData = {};
    
    // Map values to column names
    headers.forEach((header, index) => {
      rowData[header.trim()] = values[index] ? values[index].trim() : '';
    });
    
    // Extract x value (assuming it's the first column)
    if (headers[0] && rowData[headers[0]]) {
      const xValue = parseFloat(rowData[headers[0]]);
      result.xValues.push(xValue);
      
      // Extract party values
      ['TMC', 'BJP', 'INC', 'CPIM'].forEach(party => {
        if (party in rowData) {
          result.parties[party].push(parseFloat(rowData[party]) || 0);
        }
      });
    }
  }
  
  return result;
};