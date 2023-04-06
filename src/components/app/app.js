import { Component } from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AppFooter from "../app-footer"

import './app.css'

export default class App extends Component{

    maxid = 100;

    state = {
        todoData: [
            this.createTodoitem('Make App'),
            this.createTodoitem('Make App'),
            this.createTodoitem('Make App'),
        ],
        term: '',
        filter: 'all'
    }

    createTodoitem(label) {
    return {
        label,
        important: false,
        done: false,
        id: this.maxid ++
    }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((el) => el.id === id);

            const newArray = [
                ...todoData.slice(0, index),
                ...todoData.slice(index + 1)
            ]
            return {
                todoData: newArray
            }
        })
    }

    addItem = (text) => {

        const newItem = this.createTodoitem(text);

        this.setState(({ todoData }) => {
            
            const newArray = [...todoData, newItem]

            return {
                todoData: newArray
            }
        })
    }

    toggleProperties(arr, id, status) {

        const index = arr.findIndex((el) => el.id === id)

        const oldItem = arr[index];
        const newItem = { ...oldItem, [status]: !oldItem[status] };
      
      return [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index + 1)]
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
               todoData: this.toggleProperties(todoData, id, 'done')
           }
       })
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperties(todoData, id, 'important')
            }
        })
    }

    onSearchChange = (term) => {
        this.setState({term})
    }

    search(items, term){
        if (term.length === 0) return items;

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }
    
    onFilterChange = (filter) => {
        this.setState({filter})
    }

    filter(items, filter) {
        switch (filter) {
            case 'all': return items;
            case 'active': return items.filter((item) => !item.done);
            case 'done': return items.filter((item) => item.done)
            default: return items;
        }  
    }
    render() {

        const { todoData,term, filter } = this.state
        const visibleItem = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length
        const todoCount = todoData.length - doneCount

        return (
            <div className="todo-app">
                <AppHeader done={doneCount} todo={todoCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
                </div>
                <TodoList todos={visibleItem}
                    onDeleted={this.deleteItem}
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}
                />
                <AppFooter onItemAdded={this.addItem} />
            </div>    
        )
    }
}