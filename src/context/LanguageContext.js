import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext();

const translations = {
  en: {
    signInTitle: 'Sign in to your account',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign in',
    signUp: 'Sign up',
    dontHaveAccount: "Don't have an account? ",
    alreadyMember: 'Already member ? ',
    submit: 'Submit',
    getStarted: 'Get Started',
    profileComplete: 'Profile Complete',
    events: 'Events',
    institutions: 'Institutions',
    seeAll: 'See all',
    chatNow: 'Chat Now',
    consultAdvisor: 'Consult your Advisor',
    scholarshipHeadline: 'Find your dream university',
    scholarshipSub: 'Explore institutions, track your application, and chat with advisors — all in one place.'
  },
  bn: {
    signInTitle: 'আপনার অ্যাকাউন্টে সাইন ইন করুন',
    email: 'ইমেইল',
    password: 'পাসওয়ার্ড',
    signIn: 'সাইন ইন',
    signUp: 'সাইন আপ',
    dontHaveAccount: 'অ্যাকাউন্ট নেই? ',
    alreadyMember: 'ইতিমধ্যে সদস্য ? ',
    submit: 'সাবমিট',
    getStarted: 'শুরু করুন',
    profileComplete: 'প্রোফাইল সম্পন্ন',
    events: 'ইভেন্টস',
    institutions: 'ইনস্টিটিউশনস',
    seeAll: 'সব দেখুন',
    chatNow: 'চ্যাট করুন',
    consultAdvisor: 'আপনার অ্যাডভাইসরের সাথে কথা বলুন',
    scholarshipHeadline: 'আপনার স্বপ্নের বিশ্ববিদ্যালয় খুঁজুন',
    scholarshipSub: 'ইনস্টিটিউশন অনুসন্ধান, অ্যাপ্লিকেশন ট্র্যাকিং ও অ্যাডভাইজরের সাথে চ্যাট — সব এক জায়গায়।'
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('appLanguage');
        if (saved) setLanguage(saved);
      } catch {}
      setLoading(false);
    })();
  }, []);

  const toggleLanguage = async () => {
    const next = language === 'en' ? 'bn' : 'en';
    setLanguage(next);
    try {
      await AsyncStorage.setItem('appLanguage', next);
    } catch {}
  };

  const t = useMemo(() => {
    const dict = translations[language] || translations.en;
    return (key) => dict[key] ?? key;
  }, [language]);

  const value = { language, setLanguage, toggleLanguage, t, loading };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};


