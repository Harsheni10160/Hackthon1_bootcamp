# Prompt Engineering Basics

## What is Prompt Engineering?
Prompt engineering is the practice of designing clear, structured, and goal-oriented instructions for Large Language Models (LLMs) so that they produce accurate, consistent, and useful outputs.

In this project, prompt engineering is critical because the AI must:
1) Analyze resumes and job descriptions
2) Return structured feedback
3) Generate targeted interview questions
4) Follow professional HR behavior consistently



## Types of Messages in an LLM Chat

### 1. System Message
The system message defines the role, behavior, and boundaries of the AI.

Example:
"You are a professional technical recruiter. You must respond in structured JSON and never give medical or legal advice."

This ensures the AI stays in character throughout the session.

---

### 2. User Message
The user message contains the actual input or request.

Example:
"Here is my resume and job description. Analyze the skill gaps."

The user message changes every interaction.

---

### 3. Assistant Message
The assistant message is the AI’s response based on the system and user messages.

In this project, assistant messages are expected to:
- Follow JSON format
- Be structured and predictable
- Avoid unnecessary explanations

---

## Why JSON Output is Important

JSON output is important because:
- It is machine-readable
- Frontend (React) can easily consume it
- It prevents inconsistent AI responses
- It enables dashboards, charts, and highlights

Example JSON structure used in this project:
```json
{
  "matchScore": 72,
  "missingSkills": ["React Hooks", "System Design"],
  "sectionFeedback": {
    "Projects": "Lacks measurable impact",
    "Skills": "Needs better alignment with job description"
  }
}