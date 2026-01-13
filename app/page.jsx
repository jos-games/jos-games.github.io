'use client';

import './font.css';
import Login from './components/login'
import LoadingSpinner from "./components/loading";
import {useEffect, useState} from "react";
import {XMLParser} from "fast-xml-parser";
import Question from "./components/question";

export default function Home() {

  const [games, setGames] = useState(null);
  const [isLoadingGames, setIsLoadingGames] = useState(true);

  const [selectedGame, setSelectedGame] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const [isGameCompleted, setIsGameCompleted] = useState(false);

  useEffect(() => {
    fetch('/games.xml')
      .then(res => res.text())
      .then(xml => {
        const parser = new XMLParser();
        const games = parser.parse(xml);
        setGames(games["games"]["game"].map(game => ({
          title: game["title"],
          password: game["password"].toLowerCase(),
          questions: game["questions"]["question"].map(question => ({
            prompt: question["prompt"],
            answer: question["answer"].toLowerCase(),
            reward: question["reward"],
          }))
        })));
      })
  }, []);

  useEffect(() => {
    if(games != null) {
      console.log("game xml load success!");
      console.log(games);
      setIsLoadingGames(false);
    }
  }, [games]);

  const handleValidPassword = (password) => {
    const matchingGame = games.filter(game => game["password"] === password)[0];
    console.log("matching game:", matchingGame);
    setSelectedGame(matchingGame);
  }

  const handleNextQuestion = () => {setCurrentQuestionIdx(currentQuestionIdx + 1)};

  return (
    <div className="flex flex-col min-h-screen min-h-[100dvh] items-center justify-center">
      <main className="flex min-h-[100dvh] w-full max-w-3xl flex-col items-center justify-between py-16 px-16 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          { isLoadingGames ?
            <LoadingSpinner /> :
              selectedGame == null ?
                <Login validPasswords={games.map(game => game["password"])} onValidPassword={handleValidPassword}/> :
                currentQuestionIdx === selectedGame["questions"].length ?
                  <p>END OF GAME</p> :
                  <Question question={selectedGame["questions"][currentQuestionIdx]} onNextQuestion={handleNextQuestion} />
          }
        </div>
      </main>
    </div>

  );
}
