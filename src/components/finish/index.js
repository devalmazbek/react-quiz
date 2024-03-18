import { useQuiz } from "../../context/QuizContext";

export default function Finish() {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();

  const handleRestart = function () {
    dispatch({ type: "restart" });
  };

  const percent = (points / maxPossiblePoints) * 100;

  return (
    <>
      <p className="result">
        You score <strong>{points}</strong>
        out of {maxPossiblePoints} points ({Math.ceil(percent)}%)
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
      <button className="btn btn-ui" onClick={handleRestart}>
        Restart
      </button>
    </>
  );
}
