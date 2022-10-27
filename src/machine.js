import { createMachine, assign } from "xstate";

const initContext = {
  board: Array(9).fill(null),
  //array with length of 9, fill with null
  player: "O",
  winner: undefined
};

function isValidDraw(ctx, event) {
  if (ctx.board[event.index]) return false;
  return true;
}

function checkWinner(context, event) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const line of winningLines) {
    //確認上面組合中有沒有贏家組合
    const OWin = line.every((index) => context.board[index] === "O");
    if (OWin) return true;
    const XWin = line.every((index) => context.board[index] === "X");
    if (XWin) return true;
  }
  //都沒人贏代表平手
  return false;
}

function checkTie(context) {
  //確認board陣列全部被填滿後沒有
  return context.board.every((item) => item !== null);
}

const gameMachine = createMachine(
  {
    id: "tic-tac-toe",
    initial: "playing",
    //initial state
    context: initContext,
    states: {
      //pre-defined scenario
      playing: {
        on: {
          //what action can player perfrom during playing
          DRAW: {
            //capital letter for naming action
            target: "playing",
            //keep on playing
            cond: "isValidDraw",
            //condition to be checked before action, run action if true
            actions: ["updateBoard", "changePlayer"]
            //will update O or X on screen, then switch player
            //reference to action updateBoard below
            //when state is playing, two actions will be run
          },
          "": [
            {
              // condition that will always run when we get in the state of playing
              cond: "checkWinner",
              //if true, call target winner
              target: "winner"
              //reference winner action below
            },
            {
              cond: "checkTie",
              //if true, call target winner
              target: "tie"
            }
          ]
        }
      },
      winner: {
        onEntry: "setWinner"
        //once entry, call setWinner
        //do not need to determine if game over, since the codition blocks onEntry in this function
      },
      tie: { onEntry: "setTie" }
    }
    //store info
  },
  {
    actions: {
      //store all pre-defined action
      updateBoard: assign(
        //changing value through assign
        {
          board: (ctx, event) => {
            // console.log(event);
            // console.log(ctx);
            const board = [...ctx.board];
            board[event.index] = ctx.player;
            //as defined above
            //the index passed in handleClick
            return board;
            //context seems to be machine object
          }
        }
      ),
      changePlayer: assign({
        player: (ctx) => {
          // function to swtich player
          return ctx.player === "O" ? "X" : "O";
        }
      }),
      setWinner: assign({
        winner: (ctx) => {
          return ctx.player === "O" ? "X" : "O";
        }
      }),
      setTie: assign({
        winner: () => "平手"
      })
    },
    guards: {
      //condition for rendering, written above gameMachine
      isValidDraw,
      checkWinner,
      checkTie
    }
  }
);
//two params
export { gameMachine };

//staely => visualise tool
