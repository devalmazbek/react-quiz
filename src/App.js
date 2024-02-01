import { useReducer, useEffect } from "react";

import Header from "./components/header";
import Main from "./components/main";
import Loader from "./components/loading";
import Error from "./components/error";
import SmartScreen from "./components/smartscreen";
import Question from "./components/question";
import NextButton from "./components/next-button";
import Progress from "./components/progress";
import Finish from "./components/finish";
import Timer from "./components/timer";
import "./App.css";

const initialState = {
  question: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondRemaining: null,
};

const SECOND_PER_QUESTION = 20;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        question: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start": {
      return {
        ...state,
        status: "active",
        secondRemaining: state.question.length * SECOND_PER_QUESTION,
      };
    }
    case "newAnswer": {
      const question = state.question.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "next": {
      return {
        ...state,
        index: state.index++,
        answer: null,
      };
    }
    case "finish": {
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    }

    case "restart": {
      return {
        ...initialState,
        question: state.question,
        status: "ready",
      };
    }

    case "timer":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("Action unkonown");
  }
}

export default function App() {
  const [
    { status, question, index, answer, points, highscore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = question.reduce(
    (prev, current) => prev + current.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:8080/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <SmartScreen question={question} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              question={question}
              index={index}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              question={question[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Timer secondRemaining={secondRemaining} dispatch={dispatch} />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              question={question}
            />
          </>
        )}

        {status === "finish" && (
          <Finish
            dispatch={dispatch}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}
