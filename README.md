# TechPrep — Interview Questions

An Angular 21 app for interview preparation across **Angular, React, JavaScript, HTML & CSS, .NET / C#,
Java & Spring, Python and PHP & Laravel** — fresher to senior.

- Questions by technology, topic and experience level, with interview-ready answers and code
- "In simple words" explanations in English, Hindi (Hinglish) and Bengali, plus diagrams
- Practice with search and filters, flashcards, MCQ quiz and a KBC-style quiz mode
- Mock interviews per topic with a timer, self-rating and a scorecard
- Progress is stored only in the browser (localStorage)

## Run locally

```bash
npm install
npm start          # http://localhost:4200
npm test           # unit tests (Vitest)
npm run build      # production build in dist/
```

## Where things live

- `src/app/data/topics.ts` — technologies (tracks) and topics
- `src/app/data/` — question banks; `tech/` holds React, .NET, Java, Python and PHP
- `src/app/data/track-loader.ts` — each technology is a lazily loaded chunk
- `src/app/pages/` — Home, Topic, Practice, Flashcards, Quiz, KBC and Mock Interview
