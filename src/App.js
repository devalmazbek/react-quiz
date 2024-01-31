import { useReducer, useEffect } from "react";
import Header from "./components/header";
import Main from "./components/main";
import Loader from "./components/loading";
import Error from "./components/error";
import SmartScreen from "./components/smartscreen";
import Question from "./components/question";
import NextButton from "./components/next-button";
import Progress from "./components/progress";
import "./App.css";

const initialState = {
  question: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

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

    default:
      throw new Error("Action unkonown");
  }
}

export default function App() {
  const [{ status, question, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}
