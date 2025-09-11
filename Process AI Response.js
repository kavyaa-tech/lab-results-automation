const raw = $json["choices"]?.[0]?.message?.content || $json["choices"]?.[0]?.text;

if (!raw) throw new Error("No response from Groq");

// Clean up common formatting issues
let cleaned = raw.trim();

// Remove ```json or ``` wrappers anywhere
cleaned = cleaned.replace(/```json/gi, '')
                 .replace(/```/g, '')
                 .trim();

// Try parsing
let parsed;
try {
  parsed = JSON.parse(cleaned);
} catch (e) {
  // Fallback: try regex extraction
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (match) {
    parsed = JSON.parse(match[0]);
  } else {
    throw new Error("Groq did not return valid JSON: " + cleaned);
  }
}

return [{ json: parsed }];
