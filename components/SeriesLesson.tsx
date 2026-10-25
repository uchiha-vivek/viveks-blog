import Link from "next/link";
import type { Lesson } from "@/lib/lessons/series";
import type { Chapter } from "@/lib/curriculum";
import MathText, { Equation } from "@/components/MathText";
import LessonQuiz from "@/components/LessonQuiz";
import ComplexDiagram from "@/components/ComplexDiagram";
import { illustrations } from "@/components/illustrations";

export default function SeriesLesson({ lesson, lessons, chapter }: { lesson: Lesson; lessons: Lesson[]; chapter: Chapter }) {
  const lessonIndex = lessons.findIndex((item) => item.slug === lesson.slug);
  const previous = lessons[lessonIndex - 1];
  const next = lessons[lessonIndex + 1];
  return <div className="lesson-content">
    <p className="lesson-intro"><MathText text={lesson.intro} /></p>
    {previous && <p className="lesson-prerequisite">Before you begin: <Link href={`/post/${previous.slug}`}>{previous.title} →</Link></p>}
    <aside className="lesson-goals" aria-label="Learning goals">
      <h2>What you’ll learn</h2>
      <ul>{lesson.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
    </aside>
    <nav className="lesson-contents" aria-label="Lesson contents">
      <h2>In this lesson</h2>
      <ol>{lesson.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title.replace(/^\d+\. /, "")}</a></li>)}</ol>
      <a href="#quiz">Jump to the practice questions →</a>
    </nav>
    {lesson.sections.map((section) => <section key={section.id} id={section.id} className="lesson-section" aria-labelledby={`${section.id}-title`}>
      <h2 id={`${section.id}-title`}>{section.title}</h2>
      {section.paragraphs.map((paragraph, index) => <p key={index}><MathText text={paragraph} /></p>)}
      {section.equations?.map((tex) => <Equation key={tex} tex={tex} />)}
      {section.illustration && <ComplexDiagram kind={section.illustration} />}
      {section.sketch && (() => { const Sketch = illustrations[section.sketch]; return <Sketch />; })()}
      {section.example && <div className="lesson-example">
        <h3>{section.example.title}</h3>
        <ol>{section.example.steps.map((step, index) => <li key={index}><MathText text={step} /></li>)}</ol>
        {section.example.equations?.map((tex) => <Equation key={tex} tex={tex} />)}
      </div>}
      {section.mistake && <aside className="lesson-mistake"><strong>Common mistake</strong><p><MathText text={section.mistake} /></p></aside>}
      <p className="lesson-recap"><strong>Remember:</strong> <MathText text={section.recap} /></p>
    </section>)}
    <LessonQuiz questions={lesson.questions.map((question) => ({ ...question, prompt: <MathText text={question.prompt} />, options: question.options.map((option, index) => <MathText key={index} text={option} />), explanation: <MathText text={question.explanation} /> }))} />
    <nav className="lesson-navigation" aria-label="Continue learning">
      {previous && <Link href={`/post/${previous.slug}`}>← Previous: {previous.title}</Link>}
      {next && <Link href={`/post/${next.slug}`}>Next: {next.title} →</Link>}
      <Link href={`/applied-mathematics/${chapter.slug}`}>Back to Chapter {chapter.n}</Link>
    </nav>
  </div>;
}
