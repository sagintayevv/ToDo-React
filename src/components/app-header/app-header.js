import { Component } from "react";
import './app-header.css'

export default class AppHeader extends Component{


    render() {

        const {todo, done} = this.props
        return (
            <div className="app-header d-flex">
            <h1>
                TodoList
            </h1>
            <h2>{todo} more to do,  {done} done</h2>
        </div>
        )
    }
}