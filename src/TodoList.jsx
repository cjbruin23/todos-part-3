import React, { Component } from 'react';
import TodoItem from './TodoItem.jsx';

export default class ToDoList extends Component {

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
                destroyOnClick={(event) => this.props.destroyOnClick(event)}
              /> )}
            </ul>
          </section>
        </React.Fragment>
      )
    }
  }