<?php

namespace UJM\ExoBundle\Library\Question\Handler\Type;

use UJM\ExoBundle\Library\Serializer\SerializerInterface;
use UJM\ExoBundle\Library\Validator\ValidatorInterface;

interface QuestionHandlerInterface
{
    /**
     * @return string
     */
    public function getQuestionMimeType();

    /**
     * @return ValidatorInterface
     */
    public function getQuestionValidator();

    /**
     * @return ValidatorInterface
     */
    public function getAnswerValidator();

    /**
     * @return SerializerInterface
     */
    public function getQuestionSerializer();

    /**
     * @return SerializerInterface
     */
    public function getAnswerSerializer();
}
