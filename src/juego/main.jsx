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
    const level = useContext(difficultyContext);
    const [randomCards, setRandomCards] = useState([]);
    const isInitialMount = useRef(true);

    // Efecto para debug
    useEffect(() => {
        console.log('Estado actual de randomCards:', randomCards);
        console.log('Nivel actual:', level);
    }, [randomCards, level]);

    useEffect(() => {
        if (!level) return;

        // Evitar la primera ejecución si ya tenemos cartas
        if (!isInitialMount.current && randomCards.length > 0) {
            return;
        }
        isInitialMount.current = false;

        try {
            const cardCount = {
                "easy": 3,
                "medium": 4,
                "hard": 5
            }[level.toLowerCase()];

            if (!cardCount) {
                console.error('Nivel no válido:', level);
                return;
            }

            // Crear una copia limpia del array de personajes
            const charactersCopy = [...bleachCharacter]
                .filter(char => char && char.name && char.avatar);

            // Mezclar el array usando Fisher-Yates
            for (let i = charactersCopy.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [charactersCopy[i], charactersCopy[j]] = 
                [charactersCopy[j], charactersCopy[i]];
            }

            // Tomar solo las cartas necesarias
            const selectedCards = charactersCopy.slice(0, cardCount);

            // Verificar que tenemos suficientes cartas válidas
            if (selectedCards.length !== cardCount) {
                console.error('No hay suficientes cartas válidas');
                return;
            }

            // Actualizar el estado solo si las cartas son diferentes
            setRandomCards(prev => {
                if (JSON.stringify(prev) === JSON.stringify(selectedCards)) {
                    return prev;
                }
                return selectedCards;
            });

        } catch (error) {
            console.error('Error al generar cartas:', error);
        }
    }, [level]); // Solo depende del nivel

    const pickCharacter = useCallback((e, character) => {
        e.preventDefault();
        if (!character || !character.name || !character.avatar) return;
        
        handlePicked(prev => [...prev, {
            name: character.name,
            avatar: character.avatar
        }]);
    }, [handlePicked]);

    if (!level) {
        return <div className="character-container">Selecciona una dificultad</div>;
    }

    if (randomCards.length === 0) {
        return <div className="character-container">Cargando personajes...</div>;
    }

    return (
        <div className="character-container">
            {randomCards.map((character, index) => (
                <div 
                    onClick={(e) => pickCharacter(e, character)}
                    key={`${character.name}-${index}-${level}`}
                    className="character-card"
                >
                    <img 
                        src={character.avatar} 
                        alt={character.name}
                        onError={(e) => {
                            e.target.onerror = null;
                            console.error(`Error cargando imagen para ${character.name}`);
                        }}
                    />
                    <div className="character-name">{character.name}</div>
                </div>
            ))}
        </div>
    );
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
    const [difficulty, setDifficulty] = useState('');
    const [cardPicked, setCardPicked] = useState([]);

    const handlePicked = useCallback((updater) => {
        setCardPicked(updater);
    }, []);

    const handleLevel = useCallback((event) => {
        const newLevel = event.target.innerText;
        setDifficulty(newLevel);
    }, []);

    return (
       <div className="father">
            {difficulty ? (
                <CardBoard difficulty={difficulty}>
                    <CardCharacter 
                        handlePicked={handlePicked} 
                        cardPicked={cardPicked} 
                        bleachCharacterProps={bleachCharacter} 
                    />
                </CardBoard>
            ) : (
                <MenuMemoryGame 
                    setDifficulty={handleLevel} 
                    difficulty={difficulty} 
                />
            )}
       </div>
    );
}