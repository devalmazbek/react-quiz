export default function Finish({
  points,
  maxPossiblePoints,
  highscore,
  dispatch,
}) {
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
