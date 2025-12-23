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
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);}