import React, { useState } from 'react';

import { questions } from '../questions'

/* Imagenes */
import gokuOk from '../assets/goku-ok.avif'
import vegetaFail from '../assets/vegeta-fail.avif'
import dragonBallLogo from '../assets/dragonball-logo.png'



const getRandomQuestions = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
}

const QuizGame = () => {


    const [quizQuestions, setQuizQuestions] = useState(getRandomQuestions());
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswerClick = (answer, e) => {
        if (e && e.target) {
            e.target.blur(); // <- esto elimina el focus visual
        }

        setSelectedAnswer(answer);

        if (answer === quizQuestions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            setSelectedAnswer(null);
            setCurrentQuestion(currentQuestion + 1);
        }, 1000);
    };


    const restartGame = () => {
        setQuizQuestions(getRandomQuestions());
        setCurrentQuestion(0);
        setScore(0);
    };

    return (
        <div className='container'>

            <img className='logo' src={dragonBallLogo} alt="Logo de Dragon Ball" />
            <div className="game-wrapper">

                <p className='score'>Score: {score}</p>

                {currentQuestion < quizQuestions.length ? (
                    <>

                        {/* IMAGENES ELIMINADAS POR SI ALGUN DÍA VUELVO A PONERLAS */}
                        {/* {quizQuestions[currentQuestion].img && (

                            <div className="question-img"> 
                                <img
                                    className='question-img'
                                    src={quizQuestions[currentQuestion].img}
                                    alt="Imagen de la pregunta"
                                />
                            </div>

                        )} */}

                        <h2>{quizQuestions[currentQuestion].question}</h2>


                        <ul key={currentQuestion}>
                            {quizQuestions[currentQuestion].answers.map((answer, index) => (


                                <li
                                    key={index}
                                    onClick={(e) => handleAnswerClick(answer, e)}
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

                    </>
                ) : (
                    <>
                        <p>¡Juego completado! Puntuación final: {score} / {quizQuestions.length}</p>
                        <button className='play-again-button' onClick={restartGame}>Jugar de nuevo</button>

                        {score < 5 ? (
                            <>
                                <p>Podías haberlo hecho mejor</p>
                                <img src="./vegeta-fail.avif" alt="" />
                                <img src={vegetaFail} alt="Vegeta fallando" />
                            </>
                        ) : (
                            <>
                                <p className='win'>Enhorabuena!!!</p>
                                <img src="./goku-ok.avif" alt="" />
                                <img src={gokuOk} alt="Goku aprobando" />
                            </>
                        )}
                    </>
                )}

            </div>
        </div>
    );
};

export default QuizGame;
