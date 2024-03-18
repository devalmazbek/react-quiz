import { useQuiz } from "./context/QuizContext";

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

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <SmartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Timer />
            <NextButton />
          </>
        )}

        {status === "finish" && <Finish />}
      </Main>
    </div>
  );
}
