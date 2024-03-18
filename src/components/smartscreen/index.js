import { useQuiz } from "../../context/QuizContext";

export default function SmartScreen() {
  const { dispatch, question } = useQuiz();

  const onStartQuestion = function () {
    dispatch({ type: "start" });
  };

  return (
    <div className="start">
      <h2>Welcome to React Quiz</h2>
      <h3>{question.length} questions to test your react mastery</h3>
      <button className="btn btn-ui" onClick={onStartQuestion}>
        Lest's start
      </button>
    </div>
  );
}
