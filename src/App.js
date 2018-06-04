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


  render() {
    const todosList = this.state.todos;
    console.log(todosList);
    
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input value={this.state.value} className="new-todo" placeholder="What needs to be done?" 
            onKeyUp={this.handleKeyPress} onChange={this.handleChange} autoFocus></input>
        </header>
        <ToDoList todos={todosList}/>
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
            {this.props.todos.map( todo => <TodoItem toDoItem={todo.title} toDoCompleted={todo.completed}/> )}
          </ul>
        </section>
      </React.Fragment>
    )
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

export default App;
