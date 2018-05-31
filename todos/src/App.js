import React, { Component } from 'react';
import './App.css';
import toDoList from './todos.json';

class App extends Component {
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" placeholder="What needs to be done?" autoFocus></input>
        </header>
        <ToDoList />
        <footer className="footer">
          <span className="todo-count"><strong>0</strong> item(s) left</span>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
    );
  }
}

class TodoItem extends Component {
  
  render() {
    const isCompleted = this.props.toDoCompleted;

    const renderComplete = isCompleted ? (
      <input className="toggle" type="checkbox" checked></input>
    ) : (
      <input className="toggle" type="checkbox"></input>
    )


    return (
      <li className={isCompleted? 'completed': ''}>
        <div className="view">
          {renderComplete}
          <label>{this.props.toDoItem}</label>
          <button className="destory"></button>
        </div>
      </li>
    )   
  }
}

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: toDoList
    }
  }
  render() {
    return (
      <React.Fragment>
        <section className="main">
          <ul className="todo-list">
            {this.state.todos.map( todo => <TodoItem toDoItem={todo.title} toDoCompleted={todo.completed}/> )}
          </ul>
        </section>
      </React.Fragment>
    )
  }
}

export default App;
