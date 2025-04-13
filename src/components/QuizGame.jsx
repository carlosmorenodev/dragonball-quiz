import React, { useState } from 'react';

import { questions } from '../questions'



const getRandomQuestions = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
}

const QuizGame = () => {


    const [quizQuestions, setQuizQuestions] = useState(getRandomQuestions());
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const [selectedAnswer, setSelectedAnswer] = useState(null);


    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer)

        if (answer === quizQuestions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            setSelectedAnswer(null)
            setCurrentQuestion(currentQuestion + 1);
        }, 1000)
    };

    const restartGame = () => {
        setQuizQuestions(getRandomQuestions());
        setCurrentQuestion(0);
        setScore(0);
    };

    return (
        <div className='container'>
            <div className="game-wrapper">
                {currentQuestion < quizQuestions.length ? (
                    <>
                        <h2>{quizQuestions[currentQuestion].question}</h2>
                        <ul>
                            {quizQuestions[currentQuestion].answers.map((answer, index) => (


                                <li
                                    key={index}
                                    onClick={() => handleAnswerClick(answer)}
                                    className={
                                        selectedAnswer
                                            ? answer === quizQuestions[currentQuestion].correctAnswer
                                                ? 'correct'
                                                : answer === selectedAnswer
                                                    ? 'incorrect'
                                                    : ''
                                            : ''
                                    }
                                >
                                    {answer}
                                </li>

                            ))}
                        </ul>
                        <p className='score'>Score: {score}</p>
                    </>
                ) : (
                    <>
                        <p>¡Juego completado! Puntaje final: {score} / {quizQuestions.length}</p>
                        <button onClick={restartGame}>Jugar de nuevo</button>

                        {score < 5 ? (
                            <>
                                <p>Podías haberlo hecho mejor</p>
                                <img src="./vegeta-fail.avif" alt="" />
                            </>
                        ) : (
                            <>
                                <p>Enhorabuena!!!</p>
                                <img src="./goku-ok.avif" alt="" />
                            </>
                        )}
                    </>
                )}

            </div>
        </div>
    );
};

export default QuizGame;
