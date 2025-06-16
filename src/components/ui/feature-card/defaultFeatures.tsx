
import React from 'react';
import { FaRobot, FaUserTie, FaLightbulb, FaRocket } from "react-icons/fa";
import { Feature } from './types';

export const defaultFeatures: Feature[] = [
  {
    title: "AI-Powered Screening",
    description: "Advanced algorithms analyze resumes and match candidates with precision, saving you hours of manual review.",
    icon: <FaRobot className="h-8 w-8 text-primary" />,
    animationDelay: 0,
  },
  {
    title: "Smart Interview Questions",
    description: "Generate personalized interview questions based on candidate experience and job requirements automatically.",
    icon: <FaUserTie className="h-8 w-8 text-secondary" />,
    animationDelay: 500,
  },
  {
    title: "Intelligent Insights",
    description: "Get detailed candidate analysis with strengths, potential concerns, and hiring recommendations.",
    icon: <FaLightbulb className="h-8 w-8 text-primary" />,
    animationDelay: 1000,
  },
  {
    title: "Backup Candidates",
    description: "Never start from scratch again. Get ranked backup candidates when your first choice declines.",
    icon: <FaRocket className="h-8 w-8 text-secondary" />,
    animationDelay: 1500,
  },
];
