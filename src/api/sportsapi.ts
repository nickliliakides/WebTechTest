// TODO implement: https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple

import { Question, QuestionResponse } from '../types/Question';

export const getQuestions = async (): Promise<QuestionResponse> => {
  const res = await fetch(
    'https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple  '
  );
  const data = await res.json();
  data.results.forEach((question: Question, index: number) => {
    question['id'] = index + 1;
    question['question'] = question['question']
      .replace(/&#039;/g, "'")
      .replace(/&eacute;/g, 'e')
      .replace(/&ouml;/g, 'o')
      .replace(/&quot;/g, '"');
  });
  return data;
};
