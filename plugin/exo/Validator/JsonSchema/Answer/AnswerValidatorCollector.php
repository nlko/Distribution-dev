<?php

namespace UJM\ExoBundle\Validator\JsonSchema\Question;

use JMS\DiExtraBundle\Annotation as DI;
use UJM\ExoBundle\Library\Question\Handler\QuestionHandlerCollector;
use UJM\ExoBundle\Library\Validator\JsonSchemaValidator;

/**
 * Collects question type validators.
 *
 * @DI\Service("ujm_exo.validator.answer_collector")
 */
class AnswerValidatorCollector extends QuestionHandlerCollector
{
    /**
     * Forwards validation to the correct type handler.
     *
     * @param mixed $answer
     * @param array $options
     *
     * @return array
     *
     * @throws \UJM\ExoBundle\Library\Question\Handler\Exception\UnregisteredHandlerException
     */
    public function validateMimeType($answer, array $options = [])
    {
        /** @var JsonSchemaValidator $validator */
        $validator = $this->getHandlerForMimeType($question->type);

        return $validator->validate($question, $options);
    }
}
