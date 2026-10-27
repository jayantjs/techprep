import { NOTES_QUESTIONS } from '../notes';
import { QUIZ } from '../quiz';
import { WEB_QUESTIONS } from '../web';
import { pick } from './pick';

export default pick('web', [WEB_QUESTIONS, NOTES_QUESTIONS], [QUIZ]);
