export default function Progress({
  question,
  index,
  points,
  maxPossiblePoints,
}) {
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
