
export default function GameBoard({onSelectActivePlayer ,  board}){
 
    // const [gameBoard , setGameBoard] = useState(initialGameBoard);

    // function handleGameTileClick(rowIndex , colIndex){
    // setGameBoard((prevGameBoard) => {
    //     const updatedGameBoard = [...prevGameBoard.map(internalArray => [...internalArray])];
    //     updatedGameBoard[rowIndex][colIndex] =activeGamePlayer;
    //     return updatedGameBoard;
    // });
    // onSelectActivePlayer();
    // }
        return (
            <ol id="game-board">
                {board.map((row, rowIndex)=> (<li key = {rowIndex}>
                    <ol>
                        {row.map((playerSymbol , colIndex)=> (<li key = {colIndex}> 
                            <button onClick={() => onSelectActivePlayer(rowIndex, colIndex)}   disabled = {playerSymbol != null}>{playerSymbol} 
                               
                            </button>

                        </li>))}
                    </ol>
                </li>))}
            </ol>


    );

}