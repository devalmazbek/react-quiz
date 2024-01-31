export default function NextButton({ dispatch, answer }) {
  const handleNextQuestion = function () {
    dispatch({ type: "next" });
  };

  if (answer === null) return;

  return (
    <button className="btn btn-ui" onClick={handleNextQuestion}>
      Next
    </button>
  );
}
