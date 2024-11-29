type Suit = "SPADES" | "DIAMONDS" | "HEARTS" | "CLUBS";

type Card = {
  id: string;
  value: string;
  suit: Suit;
  emoji: string;
};

const suits: Suit[] = ["SPADES", "DIAMONDS", "HEARTS", "CLUBS"];
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
  { value: "J", emoji: "🃏" },
  { value: "Q", emoji: "👸" },
  { value: "K", emoji: "🤴" },
  { value: "A", emoji: "🅰️" },
];
