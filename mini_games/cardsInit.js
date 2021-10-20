const cards = [
    "clubs_2",
    "clubs_3",
    "clubs_4",
    "clubs_5",
    "clubs_6",
    "clubs_7",
    "clubs_8",
    "clubs_9",
    "clubs_10",
    "clubs_J",
    "clubs_Q",
    "clubs_K",
    "clubs_A",
    "diamonds_2",
    "diamonds_3",
    "diamonds_4",
    "diamonds_5",
    "diamonds_6",
    "diamonds_7",
    "diamonds_8",
    "diamonds_9",
    "diamonds_10",
    "diamonds_J",
    "diamonds_Q",
    "diamonds_K",
    "diamonds_A",
    "hearts_2",
    "hearts_3",
    "hearts_4",
    "hearts_5",
    "hearts_6",
    "hearts_7",
    "hearts_8",
    "hearts_9",
    "hearts_10",
    "hearts_J",
    "hearts_Q",
    "hearts_K",
    "hearts_A",
    "spades_2",
    "spades_3",
    "spades_4",
    "spades_5",
    "spades_6",
    "spades_7",
    "spades_8",
    "spades_9",
    "spades_10",
    "spades_J",
    "spades_Q",
    "spades_K",
    "spades_A",
]

export const shuffleCards = (cards) => {
    for(let i = cards.length - 1; i > 0; i-- ){
        const j = Math.floor(Math.random() * (i + 1))
        const temp = cards[i]
        cards[i] = cards[j]
        cards[j] = temp
    }

    return cards
}

export default cards