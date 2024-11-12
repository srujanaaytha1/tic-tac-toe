import {useState} from 'react';

export default function Player({initialName , symbol , isActive , onChangeName})
{
    const [playerName , setPlayerName ] = useState(initialName);
    const[isEditing , setIsEditing] = useState(false);
    function handleClick(){
        setIsEditing((isEditing)=> !isEditing); // When changing the current state based on the previous state value;
        if(isEditing){
            onChangeName(symbol ,playerName)
        }
    }

    function handleChange(event){
        setPlayerName(event.target.value)
    }

    let editablePlayerName = <span className="Player-name">{playerName}</span>
    let buttonContext = 'Edit';
    if(isEditing){
        editablePlayerName = <input type="text" required value = {playerName} onChange={handleChange} />
        buttonContext = 'Save';
     }
    return (
        <li className = {isActive ? 'active' : undefined}>
            <span className= "Player">
              {editablePlayerName}
                <span className="Player-symbol"> {symbol}</span>
            </span>
            <button onClick = {handleClick}> {buttonContext}</button>
        </li>

    );
}