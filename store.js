/**
 * Single store for glorified global state
 */
export default class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState;
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    const reducers = Object.entries(this.reducer());

    const currentState = this.state;
    const nextState = {};

    for (const [key, reducer] of reducers) {
      nextState[key] = reducer(currentState[key], action);
    }

    this.state = nextState;
    this.listeners.forEach(listener => listener(nextState, action));
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}
