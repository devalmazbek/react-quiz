import { useQuiz } from "../../context/QuizContext";

export default function Progress() {
  const { question, index, points, maxPossiblePoints } = useQuiz();

  return (
    <header className="progress">
      <progress max={question.length} value={index + 1}></progress>
      <p>
        Question <strong>{index + 1}</strong> / {question.length}
      </p>
      <p>
        Points <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}
