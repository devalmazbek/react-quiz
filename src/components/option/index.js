import { useQuiz } from "../../context/QuizContext";

export default function Option({ question }) {
  const { dispatch, answer } = useQuiz();

  const hasAnswered = answer !== null;

  if (!question) return <>test</>;

  return (
    <div className="options">
      {question &&
        question?.options.map((option, index) => {
          return (
            <button
              key={option}
              className={`btn btn-option ${answer === index ? "answer" : ""} ${
                hasAnswered
                  ? index === question.correctOption
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
              disabled={hasAnswered}
              onClick={() => dispatch({ type: "newAnswer", payload: index })}
            >
              {option}
            </button>
          );
        })}
    </div>
  );
}
