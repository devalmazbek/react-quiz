import { useReducer, useEffect } from "react";
import Header from "./components/header";
import Main from "./components/main";
import Loader from "./components/loading";
import Error from "./components/error";
import SmartScreen from "./components/smartscreen";
import "./App.css";
import Question from "./components/question";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
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
    default:
      throw new Error("Action unkonown");
  }
}

export default function App() {
  const [{ status, question, index }, dispatch] = useReducer(
    reducer,
    initialState
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
        {status === "active" && <Question question={question[index]} />}
      </Main>
    </div>
  );
}
