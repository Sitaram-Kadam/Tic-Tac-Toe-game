import { useEffect, useState, useTransition } from 'react';
import './App.css';
import { connect, Provider } from "react-redux";
import { createStore } from "redux";

const initial_state = {
  marks: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  player: Math.floor(Math.random() * (2 - 1 + 1) + 1),
  gameOver: false,
  length: 0
}

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case 'SET_PLAYER':
      return { ...state, player: action.payload }
    case 'SET_MARKS':
      return { ...state, marks: action.payload }
    case 'SET_GAMEOVER':
      return { ...state, gameOver: action.payload }
    case 'SET_LENGTH':
      return { ...state, length: action.payload }
    default:
      return state;
  }
}

const store = createStore(reducer);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BoardContainer></BoardContainer>
      </Provider>

    </div>
  );
}

const mapStateToProps = ((state) => {
  return {
    marks: state.marks,
    player: state.player,
    gameOver: state.gameOver,
    length: state.length
  };
})


const mapDispatchToProps = ((dispatch) => {
  return {
    setMarks: (marks) => {
      dispatch({ type: 'SET_MARKS', payload: marks })
    },
    setPlayer: (player) => {
      dispatch({ type: 'SET_PLAYER', payload: player })
    },
    setGameOver: (gameOver) => {
      dispatch({ type: 'SET_GAMEOVER', payload: gameOver })
    },
    setLength: (length) => {
      dispatch({ type: 'SET_LENGTH', payload: length })
    }
  }
})

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);


function Board({ marks, player, setMarks, setPlayer, gameOver, setGameOver, length, setLength }) {

  useEffect(() => {
    const combinations = [
      [0, 1, 2],
      [0, 4, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8]
    ];

    for (let c of combinations) {
      if (marks[c[0]] === 1 && marks[c[1]] === 1 && marks[c[2]] === 1) {
        console.log("player 1 wins");
        setGameOver(true);
      }
      if (marks[c[0]] === 2 && marks[c[1]] === 2 && marks[c[2]] === 2) {
        console.log("player 2 wins");
        setGameOver(true);
      }
    }
  }, [marks]);

  const changeMark = (i) => {

    const m = [...marks];
    console.log(gameOver);

    if (m[i] == 0 && !gameOver) {

      m[i] = player;
      setMarks(m);
      setPlayer(player === 1 ? 2 : 1);
      setLength(length + 1);
      console.log(length);

      if (length === 8) {
        setGameOver(true);
      }

    } else if (gameOver) {
      alert("Oops! Game is over.")
    }
    else if (m[i] !== 0) {
      alert("Oops next time! Once selected it can not be change");
    }
  };


  return (
    <div className='board'>
      <h2>Welcome to the Tic-Tac-Toe game!</h2>
      <div>
        <Block mark={marks[0]} position={0} changeMark={changeMark}></Block>
        <Block mark={marks[1]} position={1} changeMark={changeMark}></Block>
        <Block mark={marks[2]} position={2} changeMark={changeMark}></Block>
      </div>
      <div>
        <Block mark={marks[3]} position={3} changeMark={changeMark}></Block>
        <Block mark={marks[4]} position={4} changeMark={changeMark}></Block>
        <Block mark={marks[5]} position={5} changeMark={changeMark}></Block>
      </div>
      <div>
        <Block mark={marks[6]} position={6} changeMark={changeMark}></Block>
        <Block mark={marks[7]} position={7} changeMark={changeMark}></Block>
        <Block mark={marks[8]} position={8} changeMark={changeMark}></Block>
      </div>
    </div>
  );
}

function Block({ mark, changeMark, position }) {
  return (
    <div
      className={`block mark${mark}`}
      onClick={(e) => { changeMark(position) }}>

    </div>
  )
}

export default App;
