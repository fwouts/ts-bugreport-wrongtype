// App has two possible states.
class App {
  state: FirstState | SecondState;

  constructor() {
    // Once the first state is over, switch to the second state.
    this.state = {
      kind: "state1",
      done: () => {
        this.state = {
          kind: "state2"
        };
      }
    };
  }
}

// First state has a done() callback.
interface FirstState {
  kind: "state1";
  done: () => void;
}

interface SecondState {
  kind: "state2";
}

// Start in the first state.
const app = new App();
console.log(app.state.kind);
// Prints "state1".
if (app.state.kind !== "state1") {
  throw new Error();
}
// From here onwards, TypeScript thinks app.state.kind is "state1".
app.state.done();
console.log(app.state.kind);
// Prints "state2".

// This does not compile because TypeScript is convinced that app.state.kind is still "state1".
// error TS2365: Operator '!==' cannot be applied to types '"state1"' and '"state2"'.
if (app.state.kind !== "state2") {
  throw new Error();
}
