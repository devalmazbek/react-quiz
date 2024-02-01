import { useEffect } from "react";

export default function Timer({ dispatch, secondRemaining }) {
  const minutes = Math.floor(secondRemaining / 60);
  const seconds = secondRemaining % 60;

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
