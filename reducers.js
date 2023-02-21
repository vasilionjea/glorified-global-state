import { Actions } from './utils.js';

export function filterReducer(state, action) {
  if (action.type === Actions.VisibilityFilter) return action.filter;
  return state;
}

export function todosReducer(state, action) {
  switch (action.type) {
    case Actions.AddTodo:
      return state.concat([{ text: action.text, completed: false }]);

    case Actions.ToggleTodo:
      return state.map((todo, index) =>
        action.index === index
          ? { text: todo.text, completed: !todo.completed }
          : todo
      );

    default:
      return state;
  }
}

export function appReducer() {
  return {
    todos: todosReducer,
    visibilityFilter: filterReducer,
  };
}