import { useQuiz } from "../../context/QuizContext";
import Option from "../option";

export default function Question() {
  const { question: questions, index } = useQuiz();
  const question = questions.at(index);

  return (
    <div>
      <h4>{question.question}</h4>
      <Option question={question} />
    </div>
  );
}
