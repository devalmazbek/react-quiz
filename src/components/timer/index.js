import { useEffect } from "react";
import { useQuiz } from "../../context/QuizContext";

export default function Timer() {
  const { dispatch, secondRemaining } = useQuiz();

  const minutes = Math.floor(secondRemaining / 60);
  const seconds = secondRemaining % 60;

  console.log("test");

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {minutes < 10 && 0}
      {minutes}:{seconds < 10 && 0}
      {seconds}
    </div>
  );
}
