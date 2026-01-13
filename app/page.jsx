'use client';

import './font.css';
import Login from './components/login'
import {useEffect, useState} from "react";
import {XMLParser} from "fast-xml-parser";

export default function Home() {

  const [games, setGames] = useState(null);
  const [isLoadingGames, setIsLoadingGames] = useState(true);

  useEffect(() => {
    fetch('/games.xml')
      .then(res => res.text())
      .then(xml => {
        const parser = new XMLParser();
        const games = parser.parse(xml);
        console.log(games);
        setGames(games);
      })
  }, []);

  useEffect(() => {
    if(games != null) {
      console.log("game xml load success!");
      setIsLoadingGames(false);
    }
  }, [games])

  return (
    <div className="flex flex-col min-h-screen max-h-screen items-center justify-center">
      <main className="flex min-h-screen max-h-screen w-full max-w-3xl flex-col items-center justify-between py-16 px-16 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <Login/>
        </div>
      </main>
    </div>

  );
}
