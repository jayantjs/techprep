import { LocalizedText } from './models';

/** Non-technical rounds that bracket a mock interview. They are coached, not scored. */
export interface TalkPrompt {
  id: string;
  question: (track: string) => string;
  tip: LocalizedText;
}

export const OPENING_PROMPTS: TalkPrompt[] = [
  {
    id: 'talk-intro',
    question: (track) => `Tell me about yourself and your experience with ${track}.`,
    tip: {
      hi: '60–90 second mein khatam karo: abhi ka role aur kitne saal ka experience, is technology mein 2–3 strong points, ek achievement number ke saath ("page load 6 s se 2 s kiya"), aur ye job kyun chahiye.',
      en: 'Keep it to 60–90 seconds: your current role and years of experience, 2–3 strengths with the technology, one achievement with a number ("cut page load from 6 s to 2 s"), and why you want this role.',
      bn: '৬০–৯০ সেকেন্ডে শেষ করো: এখনকার role আর কত বছরের experience, এই technology-তে ২–৩টা শক্তির জায়গা, একটা achievement সংখ্যা দিয়ে ("page load 6 s থেকে 2 s করেছি"), আর কেন এই চাকরি চাও।',
    },
  },
  {
    id: 'talk-project',
    question: (track) =>
      `Walk me through a recent ${track} project — your role, the architecture and one hard problem you solved.`,
    tip: {
      hi: 'STAR use karo — Situation, Task, Action, Result. Architecture shabdon mein samjhao, saaf batao ki TUMNE kya banaya, ek mushkil bug ya performance problem batao aur fix ko kaise measure kiya.',
      en: 'Use STAR — Situation, Task, Action, Result. Describe the architecture in words, say exactly what YOU built, and walk through one tough bug or performance issue and how you measured the fix.',
      bn: 'STAR ব্যবহার করো — Situation, Task, Action, Result। Architecture কথায় বুঝিয়ে দাও, পরিষ্কার বলো তুমি নিজে কী বানিয়েছ, একটা কঠিন bug বা performance সমস্যা আর fix কীভাবে মাপলে সেটা বলো।',
    },
  },
];

export const CLOSING_PROMPT: TalkPrompt = {
  id: 'talk-closing',
  question: () => 'That is all from my side. Do you have any questions for us?',
  tip: {
    hi: 'Hamesha 1–2 asli sawaal poochho: team code review kaise karti hai, tech roadmap kya hai, ya pehle 6 mahine mein success ka matlab kya hoga. Kabhi "koi sawaal nahi" mat bolo.',
    en: 'Always ask 1–2 genuine questions: how the team reviews code, what the tech roadmap looks like, or what success means in the first 6 months. Never say "No questions".',
    bn: 'সবসময় ১–২টা আসল প্রশ্ন করো: team কীভাবে code review করে, tech roadmap কেমন, বা প্রথম ৬ মাসে success মানে কী। কখনো "কোনো প্রশ্ন নেই" বোলো না।',
  },
};

/** What the interviewer says before each technical question. */
export const INTERVIEWER_LINES = [
  "Let's start with this one.",
  'Okay, next question.',
  "Good. Let's go a little deeper.",
  "Here's a practical one.",
  'Moving on.',
  'Let me ask you about something different.',
];
