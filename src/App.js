import React, { Component } from 'react';
import './App.css';
import toDoList from './todos.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      todos: toDoList
    }
  }
  
  handleKeyPress = (event) => {
    if (event.key !== 'Enter') {return}
    let newToDoItem = {
      'userID': 1,
      'id': this.state.todos[this.state.todos.length-1].id + 1,
      'title': event.target.value,
      'completed': false,
    }
    this.setState({todos: this.state.todos.concat([newToDoItem])})
    this.setState({value: ''})
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  changeComplete = (event) => {
    const newArrayToChange = this.state.todos.slice();
    const index = newArrayToChange.findIndex(x => x.id==event.target.id)   
    const todoItemToChange = newArrayToChange[index];

    todoItemToChange.completed ? todoItemToChange.completed = false : todoItemToChange.completed = true;
    this.setState({todos: newArrayToChange});
  }

  changeDestroy = (event) => {
    const newArrayToChange = this.state.todos.slice();
    const index = newArrayToChange.findIndex(x => x.id==event.target.id)   
    newArrayToChange.splice(index, 1);
    this.setState({todos: newArrayToChange});
  }

  render() {
    const todosList = this.state.todos;
    
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input value={this.state.value} className="new-todo" placeholder="What needs to be done?" 
            onKeyUp={this.handleKeyPress} onChange={this.handleChange} autoFocus></input>
        </header>
        <ToDoList 
          todos={todosList} 
          onClick={(event) => this.changeComplete(event)}
          destoryOnClick={(event) => this.changeDestroy(event)}
        />
        <footer className="footer">
          <span className="todo-count"><strong>0</strong> item(s) left</span>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
    );
  }
}

class ToDoList extends Component {

  render() {
    return (
      <React.Fragment>
        <section className="main">
          <ul className="todo-list">
            {this.props.todos.map( todo => <TodoItem 
              key ={todo.id}
              id = {todo.id}
              toDoItem={todo.title} 
              toDoCompleted={todo.completed} 
              onClick={(event) => this.props.onClick(event)}
              destoryOnClick={(event) => this.props.destoryOnClick(event)}
            /> )}
          </ul>
        </section>
      </React.Fragment>
    )
  }
}

function TodoItem(props) {
  
    const isCompleted = props.toDoCompleted;

    const renderComplete = isCompleted ? (
      <input onClick={props.onClick} className="toggle" id={props.id} type="checkbox" defaultChecked></input>
    ) : (
      <input onClick={props.onClick} className="toggle" id={props.id} type="checkbox"></input>
    )

    return (
      <li className={isCompleted? 'completed': ''}>
        <div className="view">
          {renderComplete}
          <label>{props.toDoItem}</label>
          <button className="destroy" onClick={props.destoryOnClick} id={props.id}></button>
        </div>
      </li>
    )   
  }

export default App;
