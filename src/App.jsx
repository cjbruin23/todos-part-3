import React, { Component } from 'react';
import './App.css';
import toDoList from './todos.json';
import ToDoList from './TodoList.jsx';
import { Link, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      todos: toDoList
    }
  }

  handleKeyPress = (event) => {
    if (event.key !== 'Enter') { return }
    let newToDoItem = {
      'userID': 1,
      'id': this.state.todos[this.state.todos.length - 1].id + 1,
      'title': event.target.value,
      'completed': false,
    }
    this.setState({ todos: this.state.todos.concat([newToDoItem]) })
    this.setState({ value: '' })
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  changeComplete = (event) => {
    const newArrayToChange = this.state.todos.slice();
    const index = newArrayToChange.findIndex(x => x.id == event.target.id)
    const todoItemToChange = newArrayToChange[index];

    todoItemToChange.completed ? todoItemToChange.completed = false : todoItemToChange.completed = true;
    this.setState({ todos: newArrayToChange });
  }

  changeDestroy = (event) => {
    const newArrayToChange = this.state.todos.slice();
    const index = newArrayToChange.findIndex(x => x.id == event.target.id)
    newArrayToChange.splice(index, 1);
    this.setState({ todos: newArrayToChange });
  }

  deleteAll = () => {
    const newArrayToChange = this.state.todos.slice();
    for (let i = 0; i < newArrayToChange.length; i++) {
      const indItem = newArrayToChange[i];
      if (indItem.completed === true) {
        newArrayToChange.splice(i, 1);
      }
    }
    this.setState({ todos: newArrayToChange })
  }

  render() {
    const todosList = this.state.todos;
    const filteredActive = todosList.filter(todo => todo.completed === false)
    const filteredComplete = todosList.filter(todo => todo.completed === true)
    const extraProps = {
      onClick: (event) => this.changeComplete(event),
      destroyOnClick: (event) => this.changeDestroy(event)
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input value={this.state.value} className="new-todo" placeholder="What needs to be done?"
            onKeyUp={this.handleKeyPress} onChange={this.handleChange} autoFocus></input>
        </header>
        <Switch>
          <Route exact path="#/" render={(props) => (
            <ToDoList {...props} {...extraProps} todos={todosList}/>
          )}/>
          <Route exact path="#/active" render={(props) => (
            <ToDoList {...props} {...extraProps} todos={filteredActive}/>
          )}/>
          <Route exact path="#/completed" render={(props) => (
            <ToDoList {...props} {...extraProps} todos={filteredComplete}/>
          )}/>
        </Switch>

        <footer className="footer">
          {/* <!-- This should be `0 items left` by default --> */}
          <span className="todo-count"><strong>0</strong> item(s) left</span>
          <ul className="filters">
            <li>
              <Link to="#/">All</Link>
            </li>
            <li>
              <Link to="#/active">Active</Link>
            </li>
            <li>
              <Link to="#/completed">Completed</Link>
            </li>
          </ul>
          <button className="clear-completed" onClick={this.deleteAll}>Clear completed</button>
        </footer>
      </section>
    );
  }
}

export default App;
