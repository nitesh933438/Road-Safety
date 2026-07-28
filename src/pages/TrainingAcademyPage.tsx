/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { TrainingDashboard } from '../components/training/TrainingDashboard';
import { LearningCategories } from '../components/training/LearningCategories';
import { LessonViewer } from '../components/training/LessonViewer';
import { QuizModule } from '../components/training/QuizModule';
import { AchievementSystem } from '../components/training/AchievementSystem';
import { CertificateView } from '../components/training/CertificateView';
import { Leaderboard } from '../components/training/Leaderboard';
import { LESSONS, QUIZZES, BADGES, getLevel } from '../data/trainingData';

export const TrainingAcademyPage: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'certificate'>('dashboard');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);

  // State for user progress
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('roadguard_training_progress');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      xp: 0,
      completedLessons: [],
      quizScores: {},
      badges: [],
    };
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('roadguard_training_progress', JSON.stringify(progress));
  }, [progress]);

  const handleLessonComplete = (lessonId: string) => {
    setProgress((prev: any) => {
      const newProgress = { ...prev };
      if (!newProgress.completedLessons.includes(lessonId)) {
        newProgress.completedLessons = [...newProgress.completedLessons, lessonId];
        newProgress.xp += 50; // Award XP for lesson completion
        
        // Check for 'first-steps' badge
        if (!newProgress.badges.includes('first-steps')) {
          newProgress.badges = [...newProgress.badges, 'first-steps'];
        }
      }
      return newProgress;
    });
    setActiveLessonId(null);
  };

  const handleQuizComplete = (quizId: string, score: number) => {
    setProgress((prev: any) => {
      const newProgress = { ...prev };
      const previousScore = newProgress.quizScores[quizId] || 0;
      
      // Only award XP if they passed (>= 80%) and improved their score
      if (score >= 80 && score > previousScore) {
        newProgress.xp += 100; // Award XP for passing quiz
        
        // Check for specific badges
        if (quizId === 'cpr-quiz' && !newProgress.badges.includes('cpr-certified')) {
          newProgress.badges = [...newProgress.badges, 'cpr-certified'];
        }
        if (quizId === 'bleeding-quiz' && !newProgress.badges.includes('bleeding-expert')) {
          newProgress.badges = [...newProgress.badges, 'bleeding-expert'];
        }
      }
      
      newProgress.quizScores[quizId] = Math.max(score, previousScore);
      
      // Check for level up badges (e.g., Road Guardian)
      if (newProgress.xp >= 1000 && !newProgress.badges.includes('road-guardian')) {
        newProgress.badges = [...newProgress.badges, 'road-guardian'];
      }
      
      return newProgress;
    });
    setActiveQuizId(null);
  };

  // Views rendering
  if (activeLessonId) {
    const lesson = LESSONS.find(l => l.id === activeLessonId);
    if (lesson) {
      return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <LessonViewer 
              lesson={lesson} 
              onBack={() => setActiveLessonId(null)} 
              onComplete={() => handleLessonComplete(lesson.id)}
              onStartQuiz={(qId) => {
                setActiveLessonId(null);
                setActiveQuizId(qId);
              }}
            />
          </div>
        </div>
      );
    }
  }

  if (activeQuizId) {
    const quiz = QUIZZES.find(q => q.id === activeQuizId);
    if (quiz) {
      return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
          <QuizModule 
            quiz={quiz}
            onBack={() => setActiveQuizId(null)}
            onComplete={(score) => handleQuizComplete(quiz.id, score)}
          />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Offline Banner */}
        {!isOnline && (
          <div className="bg-amber-100 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 rounded-2xl p-4 flex items-center justify-center space-x-3 text-amber-800 dark:text-amber-400">
            <WifiOff className="w-5 h-5" />
            <span className="text-sm font-bold">Offline Mode: Lessons are cached and available for viewing.</span>
          </div>
        )}

        {/* Header */}
        <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Golden Hour Training Academy</h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Master life-saving skills before an emergency occurs. Complete interactive lessons, pass quizzes, earn XP, and unlock your official responder certificate.
            </p>
          </div>
          {/* Decorative background element */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 bg-slate-200/50 dark:bg-slate-800/50 p-1.5 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'dashboard'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Academy Dashboard
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'certificate'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            My Certificate
          </button>
        </div>

        {/* Main Content Area */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            <TrainingDashboard progress={progress} totalLessons={LESSONS.length} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <LearningCategories 
                  completedLessons={progress.completedLessons} 
                  onSelectLesson={setActiveLessonId} 
                />
                <AchievementSystem earnedBadges={progress.badges} />
              </div>
              
              <div className="space-y-8">
                <Leaderboard userXp={progress.xp} userLevel={getLevel(progress.xp).name} />
                
                {/* Daily Challenge Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
                  <div className="relative z-10 space-y-4">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">Daily Challenge</span>
                    <h3 className="text-xl font-bold">Complete CPR Lesson</h3>
                    <p className="text-indigo-100 text-sm">Refresh your CPR knowledge today to keep your skills sharp.</p>
                    <div className="pt-2">
                      <span className="inline-block px-4 py-2 bg-amber-500 text-white font-bold text-xs rounded-xl shadow-sm">+50 Bonus XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certificate' && (
          <div className="animate-fadeIn max-w-5xl mx-auto">
            <CertificateView userName="Guest User" xp={progress.xp} />
          </div>
        )}

      </div>
    </div>
  );
};
