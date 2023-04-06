import React, { Component } from "react";

import './todo-list-item.css'

export default class TodoListItem extends Component {

    
    render() {
        const { label, done, important, onDeleted, onToggleDone, onToggleImportant} = this.props
        
        let classNames = 'todo-list-item'

        if (done) {
            classNames += ' done '
        }

        if (important) {
            classNames += ' important '
        }

        return (
            <span className={classNames}>
                <span className="todo-list-item-label" onClick={onToggleDone}>{label}</span>
                <div>
                <button type="button"
                  className="btn btn-outline-success btn-sm " >
                    <i className="fa fa-exclamation" onClick={onToggleImportant}/>
                </button>
    
                <button type="button"
                        className="btn btn-outline-danger btn-sm float-right">
                        <i className="fa fa-trash" onClick={onDeleted} />
                </button>
                </div>
            </span>
        )
    }
}