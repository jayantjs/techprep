import { ANGULAR_EXTRA_QUESTIONS } from '../angular-extra';
import { CODING_QUESTIONS } from '../coding';
import { NOTES_QUESTIONS } from '../notes';
import { ANGULAR_CORE_QUESTIONS } from '../questions';
import { QUIZ } from '../quiz';
import { SCENARIO_QUESTIONS } from '../scenarios';
import { pick } from './pick';

export default pick(
  'angular',
  [ANGULAR_CORE_QUESTIONS, ANGULAR_EXTRA_QUESTIONS, SCENARIO_QUESTIONS, CODING_QUESTIONS, NOTES_QUESTIONS],
  [QUIZ],
);
