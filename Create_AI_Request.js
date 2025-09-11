// Get data from previous node
const item = items[0].json;

// Create the HTTP request payload
const httpPayload = {
  "model": "llama-3.3-70b-versatile",
  "messages": [
    {
      "role": "system",
      "content": "You are a medical lab assistant with 40+ years experience. Based on the provided lab results and history:\n\n1. patientMessage → Explain test results in simple, plain language for the patient, include reassurance and suggested next steps.\n2. doctorMessage → Summarize lab results for physician, highlight abnormal/critical values, note relevant history, provide follow-up recommendations.\n\nReturn ONLY valid JSON with keys: patientMessage, doctorMessage, patientEmail, doctorEmail. No extra text."
    },
    {
      "role": "user",
      "content": `Patient: ${item.patient_name || 'Unknown'}\nPatient Email: ${item.patient_email || ''}\nDoctor Email: ${item.doctor_email || ''}\nTest: ${item.test || 'Unknown Test'}\nResults: ${item.results || 'Results pending'}\nHistory: ${item.history || 'No significant medical history'}`
    }
  ],
  "temperature": 0.2,
  "max_tokens": 700
};

// Return the payload
return [{ json: httpPayload }];
