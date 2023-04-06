
import { Component } from 'react';
import './app-footer.css'

export default class AppFooter extends Component {


    state = {
        label:''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onItemAdded(this.state.label) 
        this.setState({
            label:''
        })
    }

    render() {

        return (
            <form className="d-flex mt-3" role="search" onSubmit={this.onSubmit}>
            <input className="form-control me-2" type="search" placeholder="What needs to be done?" aria-label="Search" 
                    onChange={this.onLabelChange}
                    value={this.state.label} />
            <button className="btn btn-outline-success" type="submit">Add</button>
          </form>
        )
    }
}