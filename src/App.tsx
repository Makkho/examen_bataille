import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";

type Suit = "spades" | "diamonds" | "hearts" | "clubs";

type Card = {
  id: string;
  value: string;
  suit: Suit;
  emoji: string;
};

const suits: Suit[] = ["spades", "diamonds", "hearts", "clubs"];
const values = [
  { value: "2", emoji: "2️⃣" },
  { value: "3", emoji: "3️⃣" },
  { value: "4", emoji: "4️⃣" },
  { value: "5", emoji: "5️⃣" },
  { value: "6", emoji: "6️⃣" },
  { value: "7", emoji: "7️⃣" },
  { value: "8", emoji: "8️⃣" },
  { value: "9", emoji: "9️⃣" },
  { value: "10", emoji: "🔟" },
  { value: "11", emoji: "🃏" },
  { value: "12", emoji: "👸" },
  { value: "13", emoji: "🤴" },
  { value: "14", emoji: "🅰️" },
];

const generateDeck = (): Card[] => {
  const deck: Card[] = [];
  suits.forEach((suit) => {
    values.forEach(({ value, emoji }) => {
      deck.push({
        id: uuidv4(),
        value,
        suit,
        emoji: `${emoji} ${
          suit === "spades"
            ? "♠️"
            : suit === "diamonds"
            ? "♦️"
            : suit === "hearts"
            ? "♥️"
            : "♣️"
        }`,
      });
    });
  });
  return deck.sort(() => Math.random() - 0.5);
};

const App: React.FC = () => {
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [computerCards, setComputerCards] = useState<Card[]>([]);
  const [playerCard, setPlayerCard] = useState<Card | null>(null);
  const [computerCard, setComputerCard] = useState<Card | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [playerPile, setPlayerPile] = useState<Card[]>([]);
  const [computerPile, setComputerPile] = useState<Card[]>([]);

  useEffect(() => {
    const deck = generateDeck();
    setPlayerCards(deck.slice(0, 26));
    setComputerCards(deck.slice(26));
  }, []);

  const playTurn = () => {
    if (playerCards.length === 0 || computerCards.length === 0) return;

    const playerDraw = playerCards[0];
    const computerDraw = computerCards[0];

    setPlayerCard(playerDraw);
    setComputerCard(computerDraw);

    if (playerDraw.value === computerDraw.value) {
      setWinner("Draw");
      setPlayerPile((prev) => [...prev, playerDraw, computerDraw]);
      setComputerPile((prev) => [...prev, playerDraw, computerDraw]);
      setPlayerCards((prev) => prev.slice(1));
      setComputerCards((prev) => prev.slice(1));
    } else if (
      parseInt(playerDraw.value, 14) > parseInt(computerDraw.value, 14)
    ) {
      setWinner("Player");
      setPlayerCards((prev) => [
        ...prev.slice(1),
        playerDraw,
        computerDraw,
        ...playerPile,
        ...computerPile,
      ]);
      setComputerCards((prev) => prev.slice(1));
      setPlayerPile([]);
      setComputerPile([]);
    } else {
      setWinner("Computer");
      setComputerCards((prev) => [
        ...prev.slice(1),
        playerDraw,
        computerDraw,
        ...playerPile,
        ...computerPile,
      ]);
      setPlayerCards((prev) => prev.slice(1));
      setPlayerPile([]);
      setComputerPile([]);
    }
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-center">Jeu de Bataille</h1>

      <div className="flex gap-10 mb-8">
        <div className="text-center flex flex-col items-center">
          <h2 className="text-xl mb-2">Votre Carte</h2>
          <div className="w-32 h-48 border border-white rounded-lg bg-white shadow-xl flex items-center justify-center">
            {playerCard ? (
              <div className="text-4xl">{playerCard.emoji}</div>
            ) : (
              <div className="w-full h-full bg-gray-400 flex items-center justify-center rounded-lg text-3xl text-white">
                ?
              </div>
            )}
          </div>
        </div>

        <div className="text-center flex flex-col items-center">
          <h2 className="text-xl mb-2">Carte de l'Ordinateur</h2>
          <div className="w-32 h-48 border border-white rounded-lg bg-white shadow-xl flex items-center justify-center">
            {computerCard ? (
              <div className="text-4xl">{computerCard.emoji}</div>
            ) : (
              <div className="w-full h-full bg-gray-400 flex items-center justify-center rounded-lg text-3xl text-white">
                ?
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={playTurn}
        className="px-6 py-3 bg-blue-600 text-lg font-semibold rounded-md hover:bg-blue-500 disabled:bg-gray-600 transition-all"
        disabled={playerCards.length === 0 || computerCards.length === 0}
      >
        Jouer un tour
      </button>

      <p className="mt-6 text-lg text-center">
        {winner
          ? winner === "Draw"
            ? "Égalité ! Une bataille commence..."
            : `${winner} gagne ce tour !`
          : "Cliquez sur 'Jouer un tour' pour commencer."}
      </p>

      <div className="mt-8 text-center">
        <p className="text-lg">Cartes restantes :</p>
        <p>Vous : {playerCards.length}</p>
        <p>Ordinateur : {computerCards.length}</p>
      </div>

      {playerCards.length === 0 || computerCards.length === 0 ? (
        <h2 className="mt-8 text-2xl font-bold text-center">
          {playerCards.length > 0
            ? "Vous avez gagné la partie !"
            : "L'ordinateur a gagné la partie !"}
        </h2>
      ) : null}
    </div>
  );
};

export default App;
