export default function NextButton({ dispatch, answer, index, question }) {
  const handleNextQuestion = function () {
    dispatch({ type: "next" });
  };

  const handleFinish = function () {
    dispatch({ type: "finish" });
  };

  if (answer === null) return;

  if (index < question.length - 1)
    return (
      <button className="btn btn-ui" onClick={handleNextQuestion}>
        Next
      </button>
    );

  if (index >= question.length - 1) {
    return (
      <>
        <button className="btn btn-ui" onClick={handleFinish}>
          Finish
        </button>
      </>
    );
  }
}
