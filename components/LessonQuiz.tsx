"use client";

import { useId, useState, type ReactNode } from "react";

type Question = { prompt: ReactNode; options: ReactNode[]; answer: number; explanation: ReactNode };

export default function LessonQuiz({ questions }: { questions: Question[] }) {
  const id = useId();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const complete = questions.every((_, index) => answers[index] !== undefined);
  const score = questions.filter((question, index) => answers[index] === question.answer).length;

  return <section id="quiz" className="lesson-quiz" aria-labelledby={`${id}-title`}>
    <div className="kicker">Check your understanding</div>
    <h2 id={`${id}-title`}>A little practice</h2>
    <p>Four multiple-choice questions. Try them before revealing the explanations. Your answers stay on this page until you leave or reload.</p>
    <form onSubmit={(event) => { event.preventDefault(); if (complete) setChecked(true); }}>
      {questions.map((question, index) => <fieldset key={index}>
        <legend>{index + 1}. {question.prompt}</legend>
        {question.options.map((option, optionIndex) => <label key={optionIndex} className={`quiz-option${checked && question.answer === optionIndex ? " quiz-correct" : ""}`}>
          <input type="radio" name={`${id}-${index}`} value={optionIndex} checked={answers[index] === optionIndex} onChange={() => { setAnswers({ ...answers, [index]: optionIndex }); setChecked(false); }} />
          <span>{option}</span>
        </label>)}
        {checked && <p className="quiz-feedback"><strong>{answers[index] === question.answer ? "Correct." : "Not quite."}</strong> {question.explanation}</p>}
      </fieldset>)}
      <div className="quiz-actions"><button type="submit" disabled={!complete}>Check answers</button><button type="button" onClick={() => { setAnswers({}); setChecked(false); }}>Reset choices</button></div>
      <p role="status" aria-live="polite">{checked ? `You answered ${score} of ${questions.length} correctly. Review the explanations above, then try again.` : complete ? "Ready to check your answers." : `Choose an answer for all ${questions.length} questions to check them.`}</p>
    </form>
  </section>;
}
