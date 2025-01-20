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

function CardCharacter({bleachCharacterProps, setDifficulty}) {
    const [cardPicked, setCardPicked] = useState([])
    const [round, setRound] = useState(1)
    const characterList = useRef(bleachCharacter)
    const level = useContext(difficultyContext)
    const [init, setInit] = useState(false)
    const switcher = useRef(false)
    const [randomCards, setRandomCards] = useState(() => shuffledCard(round, cardPicked))

    useEffect(() => {
        // Condiciones para perder
        const newArray = cardPicked.map((element) => {
            return element.name
        })

        const checkDuplicity = newArray.map((e) => {
            if(newArray.indexOf(e) == newArray.lastIndexOf(e)) {
                return 0
            } else {
                return 1
            }
        });

        if(checkDuplicity.includes(1)) {
            alert("GAME OVER")
            setDifficulty()
        }

        // Condiciones para Ganar
        if(level.toLowerCase() == "easy" && round == 7) {
            alert("CONGRATULATION, HAS GANADO")
            setDifficulty()
        } else if(level.toLowerCase() == "medium" && round == 8) {
            alert("CONGRATULATION, HAS GANADO")
            setDifficulty()
        } else if(level.toLowerCase() == "hard" && round == 10) {
            alert("CONGRATULATION, HAS GANADO")
            setDifficulty()
        }

        
        console.log("CardPicked es ", cardPicked)
        console.log("Nuevo Array es ", newArray)
        console.log("Chech Duplicity es ", checkDuplicity)
    }, [round])



    function shuffledCard(nRound, cardEscogida) {
        const characterRandom = [];
        //console.log(cardEscogida);
        function shuffleArray(array) {
            const newArray = [...array]; // Crear una copia para no mutar el original
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            
            // Verificar si el array es el mismo que el original
            const isSameOrder = array.every((item, index) => item === newArray[index]);
            if (isSameOrder && array.length > 1) {
                // Si el orden es el mismo, mezclar de nuevo
                return shuffleArray(array);
            }
            
            return newArray;
        }
        const availableCharacters = bleachCharacterProps.filter((e) => {
            //console.log("La carta escogida ",cardEscogida, "incluye a ", e, " ", cardEscogida.includes(e));
            if(cardEscogida.length == 0) {
                return true
            }
            return !cardEscogida.some((item) => item.name == e.name)
        })
        //console.log(`El valor del round es ${nRound}`);
        //console.log("El valor del cardEscogida es: ", cardEscogida)
        //console.log("El valor del availibleCard es: ", availableCharacters)
        // Determinar el número de cartas según el nivel
        const cardCount = level.toLowerCase() === "easy" ? 3 : 
                         level.toLowerCase() === "medium" ? 4 : 5;
        
        if(nRound > 1) {
            switcher.current = true;













            characterRandom.push(
                cardEscogida[Math.floor(Math.random() * cardEscogida.length)]
            )
        }

        //console.log(characterRandom)
        
        for (let i = 0; i < cardCount && availableCharacters.length > 0; i++) {

            if(switcher.current) {
                switcher.current = false;
                continue
            }
            const randomIndex = Math.floor(Math.random() * availableCharacters.length);
            characterRandom.push(availableCharacters[randomIndex]);
            availableCharacters.splice(randomIndex, 1);
        }
        //console.log(availableCharacters)
        const shuffleCharacterRandom = shuffleArray(characterRandom)
        
        return shuffleCharacterRandom;
    }

    useEffect(()=> {
        //console.log(cardPicked)
        //console.log(round)
        //console.log(bleachCharacterProps);
        
    },[round, cardPicked])
    

    function pickCharacter(e, character) {
        setCardPicked(() => {
            const characterAdded = [
                ...cardPicked,
                {
                    name: character.name,
                    avatar: character.avatar
                }
            ];
            setRandomCards(shuffledCard(round + 1, characterAdded));
            return characterAdded
        });
        setRound(round + 1);
        
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

    function handleLevel(ele) {
        setDifficulty(ele.target.innerText)
    }

    return (
       <div className="father">
            {
                difficulty ? 
                <CardBoard difficulty={difficulty}>
                    <CardCharacter setDifficulty={() => setDifficulty(0)} bleachCharacterProps={bleachCharacter} difficulty={difficulty} />
                </CardBoard>
                : <MenuMemoryGame setDifficulty={handleLevel} difficulty={difficulty} />
            }
       </div>
    )
}