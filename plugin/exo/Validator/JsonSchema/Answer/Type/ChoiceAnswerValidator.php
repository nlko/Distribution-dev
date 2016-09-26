<?php

namespace UJM\ExoBundle\Validator\JsonSchema\Answer\Type;

use JMS\DiExtraBundle\Annotation as DI;
use UJM\ExoBundle\Library\Question\Handler\QuestionHandlerInterface;
use UJM\ExoBundle\Library\Question\QuestionType;
use UJM\ExoBundle\Library\Validator\JsonSchemaValidator;

/**
 * @DI\Service("ujm_exo.validator.answer_choice")
 * @DI\Tag("ujm_exo.answer.validator")
 */
class ChoiceAnswerValidator extends JsonSchemaValidator implements QuestionHandlerInterface
{
    public function getQuestionMimeType()
    {
        return QuestionType::CHOICE;
    }
    
    public function getJsonSchemaUri()
    {
        return 'answer/choice/schema.json';
    }

    public function validateAfterSchema($question, array $options = [])
    {
        return [];
    }
}
