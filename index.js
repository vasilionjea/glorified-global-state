import Store from './store.js';
import { Actions } from './utils.js';
import { appReducer } from './reducers.js';

const initialState = {
  todos: [{ text: 'sleep', completed: false }],
  visibilityFilter: 'SHOW_ALL',
};

function render(todos) {
  const html = todos.reduce((html, todo) => html + `<li>${todo.text}</li>`, '');
  return html;
}

const store = new Store(appReducer, initialState);
console.log(render(initialState.todos)); // initial render

// Re-render when state changes
store.subscribe((state, action) => {
  if (action.type === Actions.AddTodo) {
    console.log(render(state.todos))
  }
});

// Add some todos
setTimeout(() => store.dispatch({ type: Actions.AddTodo, text: 'wake up' }), 1500);
setTimeout(() => store.dispatch({ type: Actions.AddTodo, text: 'drink coffee' }), 3000);

// Change some other state
// setTimeout(() => store.dispatch({ type: Actions.ToggleTodo, index: 0 }), 4000);
// setTimeout(() => store.dispatch({ type: Actions.VisibilityFilter, filter: 'SHOW_COMPLETED' }), 5000);
