import "./styles.css";
import Board from "./Board";
import { gameMachine } from "./machine";
import { useMachine } from "@xstate/react";

export default function App() {
  const [machine, send] = useMachine(gameMachine);
  // console.log(machine);
  //this is our machine object

  function handleClick(index) {
    send(
      //alike dispatch in reducer
      { type: "DRAW", index: index }
      //action to be call
    );
  }

  return (
    <div className="App">
      <h1>Welcome to Tic-Tac-Toe</h1>
      <h2>
        Player :{" "}
        {machine.context.player
          ? `${machine.context.winner} wins!`
          : `${machine.context.winner}`}
      </h2>
      {false && (
        <button style={{ marginBottom: "10px" }} onClick={() => {}}>
          RESET
        </button>
      )}
      <div>
        <Board board={machine.context.board} handleClick={handleClick} />
      </div>
    </div>
  );
}
