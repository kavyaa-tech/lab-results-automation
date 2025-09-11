# lab-results-automation
An automated workflow system that processes medical lab results, generates personalized messages for patients and doctors using AI, and sends email notifications automatically.

# Overview
This system automates the entire lab result communication process:

Monitors Google Sheets for new lab entries
Processes patient data and medical history
Generates AI-powered personalized messages
Sends automatic email notifications to patients and doctors
Logs all communications for record keeping

# Features

Real-time Processing: Automatically detects new lab entries via Google Sheets trigger
AI-Generated Communications: Uses Groq's Llama 3.3 70B model for intelligent message generation
Dual Messaging: Creates separate, appropriate messages for patients and doctors
Email Automation: Sends Gmail notifications automatically
Comprehensive Logging: Maintains detailed records of all communications
Error Handling: Robust JSON parsing and data validation

# Architecture
Workflow Components

Google Sheets Trigger: Monitors for new lab entries
Data Preparation: Formats patient data and medical history
AI Processing: Generates personalized messages using Groq API
Response Processing: Parses and validates AI responses
Email Distribution: Sends notifications via Gmail
Record Keeping: Logs all communications to Google Sheets

# Data Flow
New Lab Entry → Data Preparation → AI Message Generation → Email Sending → Record Logging

# Prerequisites
N8N instance (self-hosted or cloud)
Google Workspace account with API access
Groq API account and key
Gmail account for sending emails

# Setup Instructions
1. Google Sheets Configuration
Create two Google Sheets:
Input Sheet (Lab Results)
Required columns:
ID: Unique identifier
Patient Name: Patient's full name
Patient Email: Patient's email address
Doctor Email: Doctor's email address
Test: Type of lab test
Results_JSON: Test results in JSON format
History_JSON: Medical history in JSON format

Output Sheet (Communication Logs)
Columns:
ID, Patient Name, Patient Email, Doctor Email
Test, Results_JSON, History_JSON
Patient Message, Doctor Message, Timestamp

2. API Credentials Setup
Groq API
Sign up at Groq Console
Generate API key
Add to N8N credentials as "Groq account"

Google Services
Enable Google Sheets API in Google Cloud Console
Create OAuth2 credentials
Configure in N8N:
Google Sheets Trigger OAuth2 API
Google Sheets OAuth2 API
Gmail OAuth2 API



3. N8N Workflow Import
Copy the workflow JSON from workflow/lab-automation-workflow.json
Import into your N8N instance
Update all credential references
Configure Google Sheets document IDs
Test the workflow

# Data Formats
Results JSON Format
json{
  "WBC": 7.2,
  "RBC": 4.5,
  "Hemoglobin": 13.8,
  "Hematocrit": 41.2
}
History JSON Format
json{
  "conditions": ["anemia", "diabetes"],
  "medications": ["metformin"],
  "allergies": ["penicillin"]
}
# AI Message Generation
The system uses a specialized medical assistant prompt:
System Prompt

Role: Medical lab assistant with 40+ years experience
Patient Messages: Simple, reassuring language with next steps
Doctor Messages: Technical summaries with abnormal values highlighted
Format: JSON response with patientMessage and doctorMessage keys

Model Configuration

Model: llama-3.3-70b-versatile
Temperature: 0.2 (for consistent, factual responses)
Max Tokens: 700

# Email Templates
Patient Email

Subject: "Your Lab Results — [Test Type]"
Content: Simple, reassuring explanation of results
Tone: Compassionate and easy to understand

Doctor Email

Subject: "Lab Results — [Test Type]"
Content: Clinical summary with abnormal values highlighted
Tone: Professional and comprehensive

# Customization
Modifying AI Prompts
Edit the system prompt in the "Create AI Request" node to adjust:

Message tone and style
Medical terminology level
Specific focus areas

Adding New Test Types

Update the data preparation logic
Modify AI prompt for test-specific guidance
Add new result parsing patterns

Email Formatting
Customize email templates in the Gmail nodes:

Subject line formatting
Message structure
Additional recipient handling

# Monitoring & Logging
Execution Logs

N8N provides built-in execution history
Monitor for failed workflows
Review AI response quality

Communication Records

All sent messages logged to Google Sheets
Timestamps for audit trails
Patient and doctor message tracking

# Security Considerations

API Keys: Store securely in N8N credentials
Patient Data: Ensure HIPAA compliance
Email Security: Use OAuth2 authentication
Access Control: Limit Google Sheets access

# Error Handling
The workflow includes robust error handling:

JSON parsing fallbacks
API response validation
Email delivery confirmation
Data format validation

# Contributing

Fork the repository
Create a feature branch
Make your changes
Test thoroughly with sample data
Submit a pull request

# License
This project is licensed under the MIT License - see the LICENSE file for details.

Note: This system handles sensitive medical data. Ensure proper security measures and regulatory compliance before deployment in production environments.
