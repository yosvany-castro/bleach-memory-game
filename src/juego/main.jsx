import bleachCharacter from "./bleackCharacter"
import "./main.css"
import "./memoryGame.css"
import { useState, useRef, useEffect, useContext } from 'react';
import { createContext } from "react";

const difficultyContext = createContext("")


function MenuMemoryGame({difficulty, setDifficulty}) {
    const [isMuted, setIsMuted] = useState(false);

    return (
        <div className="memory-game-container">
            <div className="reiatsu-particles"></div>
            
            <div className="game-title">
                <h1 className="bleach-logo">BLEACH</h1>
                <h2 className="memory-text">Memory Game</h2>
            </div>

            <div className="difficulty-buttons">
                <button onClick={(e) => setDifficulty(e)} className="difficulty-btn">Easy</button>
                <button onClick={(e) => setDifficulty(e)} className="difficulty-btn">Medium</button>
                <button onClick={(e) => setDifficulty(e)} className="difficulty-btn">Hard</button>
            </div>

            <div className="controls">
                <button 
                    className="control-btn"
                    onClick={() => setIsMuted(!isMuted)}
                    aria-label="Toggle sound"
                >
                    {isMuted ? "🔇" : "🔊"}
                </button>
                <button 
                    className="control-btn"
                    aria-label="Toggle music"
                >
                    🎵
                </button>
            </div>

            <button className="help-btn" aria-label="Help">?</button>
        </div>
    );
}

function CardCharacter({bleachCharacterProps, handlePicked, cardPicked}) {
    const characterList = useRef(bleachCharacter)
    const level = useContext(difficultyContext)
    const [init, setInit] = useState(false)
    const [randomCards, setRandomCards] = useState(() => {
        const characterRandom = [];
        const availableCharacters = bleachCharacterProps.filter(Boolean)
        // Determinar el número de cartas según el nivel
        const cardCount = level.toLowerCase() === "easy" ? 3 : 
                         level.toLowerCase() === "medium" ? 4 : 5;
        
        for (let i = 0; i < cardCount && availableCharacters.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableCharacters.length);
            characterRandom.push(availableCharacters[randomIndex]);
            availableCharacters.splice(randomIndex, 1);
        }
        
        return characterRandom;

    })
    console.log(JSON.stringify(randomCards))
    

    function pickCharacter(e, character) {
        handlePicked([
            ...cardPicked,
            {
                name: character.name,
                avatar: character.avatar
            }
        ]);
        setInit(true)
    }


    
    return (
                randomCards
                .filter(character => character && character.avatar)
                .map((character, index) => (
                    <div onClick={(e) => pickCharacter(e, character)} key={`${character} + ${index}`} className="character-card">
                        <img 
                            src={character.avatar} 
                            alt={character.name} 
                        />
                        <div className="character-name">
                            {character.name}                    
                        </div>
                    </div>
                ))
    )
}

function CardBoard({children, difficulty}) {
    return (
        <div className="father-component">
            <div className="board-component">
                <difficultyContext.Provider value={difficulty}>
                    {children}
                </difficultyContext.Provider>
            </div>
        </div>
    )
}

export default function MemoryGame() {    
    const [difficulty, setDifficulty] = useState(0)
    const [cardPicked, setCardPicked] = useState([])

    function handlePicked(ele) {
        setCardPicked(ele)
    }

    function handleLevel(ele) {
        setDifficulty(ele.target.innerText)
    }

    return (
       <div className="father">
            {
                difficulty ? 
                <CardBoard difficulty={difficulty}>
                    <CardCharacter handlePicked={handlePicked} cardPicked={cardPicked} bleachCharacterProps={bleachCharacter} difficulty={difficulty} />
                </CardBoard>
                : <MenuMemoryGame setDifficulty={handleLevel} difficulty={difficulty} />
            }
       </div>
    )
}