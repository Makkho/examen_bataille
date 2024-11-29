import React, { useEffect, useState } from "react";
import axios from "axios";

type Suit = "SPADES" | "DIAMONDS" | "HEARTS" | "CLUBS";

type Card = {
  id: string;
  value: string;
  suit: Suit;
  image: string;
};

const App: React.FC = () => {
  const [deckId1, setDeckId1] = useState<string | null>(null);
  const [deckId2, setDeckId2] = useState<string | null>(null);
  const [cardsFromDeck1, setCardsFromDeck1] = useState<Card[]>([]);
  const [cardsFromDeck2, setCardsFromDeck2] = useState<Card[]>([]);

  const createDeck = async () => {
    try {
      const response = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?jokers_enabled=false"
      );
      return response.data.deck_id;
    } catch (error) {
      console.error("Erreur lors de la création du deck:", error);
      return null;
    }
  };
  return (
    <div>
      <App />
    </div>
  );
};
