import React, { useState } from 'react';
import { Upload, FileText, Briefcase, MessageSquare, Download, CheckCircle, XCircle, ArrowRight, Lightbulb } from 'lucide-react';

const AIResumeInterviewer = () => {
  const [step, setStep] = useState('upload');
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBullet, setSelectedBullet] = useState(null);
  const [rewriteSuggestion, setRewriteSuggestion] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      
      // For local version, we'll use a simple text extraction
      // In production, you'd use a proper PDF parsing library
      const reader = new FileReader();
      reader.onload = async (event) => {
        // For demo purposes, prompt user to paste resume text
        const text = prompt('Please paste your resume text here (PDF parsing requires additional libraries):');
        if (text) {
          setResumeText(text);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const analyzeResume = async () => {
    if (!resumeText || !jobDescription) {
      alert('Please upload a resume and enter a job description');
      return;
    }

    if (!apiKey) {
      alert('Please enter your Anthropic API key');
      return;
    }

    setIsLoading(true);}}
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4096,
          messages: [
            {
              role: 'user',
              content: `You are an expert ATS (Applicant Tracking System) analyzer and career coach. Analyze this resume against the job description and return ONLY a JSON object with no preamble or markdown.

Resume Text:
${resumeText}

Job Description:
${jobDescription}

Return a JSON object with this exact structure:
{
  "matchScore": <number 0-100>,
  "missingKeywords": ["keyword1", "keyword2"],
  "sectionCritique": {
    "summary": "critique text",
    "experience": "critique text",
    "skills": "critique text",
    "education": "critique text"
  },
  "strengths": ["strength1", "strength2"],
  "weaknesses": ["weakness1", "weakness2"],
  "resumeBullets": ["bullet point 1", "bullet point 2", "bullet point 3"]
}`
            }
          ]
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const textContent = data.content.find(item => item.type === 'text')?.text || '';
      
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const analysis = JSON.parse(jsonMatch[0]);
        setAnalysisData(analysis);
        setStep('analysis');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Error analyzing resume: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

