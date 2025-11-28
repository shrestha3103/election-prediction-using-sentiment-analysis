export const parseCSV = (fileContent) => {
  const rows = fileContent.split('\n').map(row => {
    // Handle quoted values with commas inside them
    let inQuote = false;
    let currentValue = '';
    const values = [];
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      
      if (char === '"' && (i === 0 || row[i-1] !== '\\')) {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        values.push(currentValue);
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    
    // Add the last value
    values.push(currentValue);
    return values;
  });
  
  const headers = rows[0];
  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      if (index < row.length) {
        obj[header.trim()] = row[index].trim();
      }
    });
    return obj;
  }).filter(obj => Object.keys(obj).length > 0 && Object.values(obj).some(val => val !== ''));
};
