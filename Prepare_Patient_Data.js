const item = items[0].json;
let results = {};
let history = {};

try {
  if(item.Results_JSON) {
    results = JSON.parse(item.Results_JSON.replace(/'/g,'"'));
  }
} catch (e) {
  results = {};
}

try {
  if(item.History_JSON) {
    history = JSON.parse(item.History_JSON.replace(/'/g,'"'));
  }
} catch (e) {
  history = {};
}

// Format results as readable text for AI
let resultsText = '';
if (results && Object.keys(results).length > 0) {
  resultsText = Object.entries(results)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
} else {
  resultsText = 'No results available';
}

// Format history as readable text for AI
let historyText = '';
if (history && Object.keys(history).length > 0) {
  const historyParts = [];
  
  // Add previous values
  Object.entries(history).forEach(([key, value]) => {
    if (key !== 'conditions' && value !== null && value !== undefined) {
      historyParts.push(`${key}: ${value}`);
    }
  });
  
  // Add conditions
  if (history.conditions && Array.isArray(history.conditions)) {
    historyParts.push(`Conditions: ${history.conditions.join(', ')}`);
  }
  
  historyText = historyParts.join(', ');
} else {
  historyText = 'No significant medical history';
}

const payload = {
  id: item.ID || item.id || null,
  patient_name: item[' Patient Name'] || item.patient_name || 'Unknown',
  patient_email: item['Patient Email'] || item.patient_email || '',
  doctor_email: item['Doctor Email'] || item.doctor_email || '',
  test: item.Test || item.test || 'Unknown Test',
  results: resultsText,  // Now formatted as readable string
  history: historyText,  // Now formatted as readable string
  rowNumber: item.rowNumber || null
};

return [{ json: payload }];
