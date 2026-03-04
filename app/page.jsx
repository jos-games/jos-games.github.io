'use client';

import './font.css';
import BadGameKey from './components/badGameKey'
import LoadingSpinner from "./components/loading";
import {useEffect, useState} from "react";
import {XMLParser} from "fast-xml-parser";
import Question from "./components/question";

export default function Home() {

  const [games, setGames] = useState(null);
  const [isLoadingGames, setIsLoadingGames] = useState(true);

  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetch('/games.xml')
      .then(res => res.text())
      .then(xml => {
        const parser = new XMLParser();
        const games = parser.parse(xml);
        setGames(games["games"]["game"].map(game => ({
          title: game["title"],
          key: game["key"].toLowerCase(),
          question: game["question"]
        })));
      })
  }, []);

  useEffect(() => {
    console.log(selectedGame)}, [selectedGame]);

  useEffect(() => {
    if(games != null) {
      const gameKeyParam = new URLSearchParams(window.location.search).get('gameKey');
      if(games.map(game => game["key"]).some(validPassword => validPassword === gameKeyParam)) {
        console.log("game key is valid");
        setSelectedGame(games.filter(game => game["key"] === gameKeyParam)[0])
      }
      setIsLoadingGames(false);
    }
  }, [games])

  return (
    <div className="flex flex-col min-h-screen min-h-[100dvh] items-center justify-center">
      <main className="flex min-h-[100dvh] w-full max-w-3xl flex-col items-center justify-between py-16 px-16 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          { isLoadingGames ?
            <LoadingSpinner /> :
              selectedGame == null ?
                <BadGameKey /> :
                <Question question={selectedGame["question"]} />
          }
        </div>
      </main>
    </div>

  );
}
