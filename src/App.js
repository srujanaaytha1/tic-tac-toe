import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import GameOver from "./components/GameOver"
import {useState} from 'react';
import Log from "./components/Log";
import {WINNING_COMBINATIONS } from './winning-combonations.js'

const initialGameBoard = [
  [null , null , null],
  [null , null , null],
  [null , null , null]
]

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer
}
function deriveWinner(gameBoard , players){

  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstsquaresymbol = gameBoard[combination[0].row][combination[0].col];
    const secondsquaresymbol =  gameBoard[combination[1].row][combination[1].col];
    const thirdsquaresymbol =  gameBoard[combination[2].row][combination[2].col]
  
 
  if(firstsquaresymbol && firstsquaresymbol === secondsquaresymbol && firstsquaresymbol === thirdsquaresymbol){
    winner = players[firstsquaresymbol];
  }

}
return winner;
}

function App() {
  const [players , setPlayers] = useState({
    X : 'player 1', 
    O : 'player 2',
  });
  const [gameTurns , setGameTurns] = useState([]);
  let activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard  = [...initialGameBoard.map(innerarray => [...innerarray])];


  for(const turn of gameTurns)
  {
      const { square , player } = turn ; 
      const { row , col } = square;
      gameBoard[row][col] = player;
  }

  const winner = deriveWinner(gameBoard , players);
  const hasDraw = gameTurns.length === 9 && !winner ; 

  function handleSelectSquare(rowIndex , colIndex){
   // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns)
     

      const  updatedTurns = [
        {square: {row: rowIndex , col : colIndex} , player : currentPlayer},
         ...prevTurns]
      return updatedTurns;
    })
  }
  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayers(symbol , newName){
    setPlayers(prevplayer => {
      return{
        ...prevplayer, 
        [symbol] : newName
      }
    });
  }
  return (
    <main>
    <div id= "game-container"> 
    <ol id= "players" className = "highlight-player">
      <Player initialName="Player 1" symbol = "X"  isActive = {activePlayer === 'X'} onChangeName = {handlePlayers}/>
      <Player initialName="Player 2" symbol = "O" isActive = {activePlayer === 'O'}  onChangeName = {handlePlayers}/>
    </ol>
    {(winner || hasDraw) && <GameOver winner ={winner} onRestart = {handleRestart}/>}
    <GameBoard onSelectActivePlayer = {handleSelectSquare} board = {gameBoard} />

    </div>
   <Log turns = {gameTurns} />
   </main>
   

  )
}

export default App
