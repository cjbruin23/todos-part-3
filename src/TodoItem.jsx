import React from 'react';

export default function TodoItem(props) {
  
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
          <button className="destroy" onClick={props.destroyOnClick} id={props.id}></button>
        </div>
      </li>
    )   
  }
