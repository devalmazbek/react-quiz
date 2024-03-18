import { createContext, useContext, useReducer, useEffect } from "react";

const QuizContext = createContext();
const SECOND_PER_QUESTION = 20;

const initialState = {
  question: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondRemaining: null,
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

function QuizProvider({ children }) {
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
      .catch((error) => dispatch({ type: "dataFailed", payload: error }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        status,
        question,
        index,
        answer,
        points,
        highscore,
        secondRemaining,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  return context;
}

export { QuizProvider, useQuiz };
