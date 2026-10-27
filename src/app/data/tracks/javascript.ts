import { JS_QUESTIONS } from '../javascript';
import { NOTES_QUESTIONS } from '../notes';
import { QUIZ } from '../quiz';
import { pick } from './pick';

export default pick('javascript', [JS_QUESTIONS, NOTES_QUESTIONS], [QUIZ]);
