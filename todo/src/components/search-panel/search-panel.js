import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        term: ''
    };

    textInputEvent = (e) => {
        this.props.onFilterTodoData(e.target.value);
        this.setState({
            term: e.target.value
        })
    }

    render() {
        return (
            <div className="search-input">
                <input type="text" placeholder="type to search"
                    onChange={this.textInputEvent} value={this.state.term} />
            </div>
        );
    };
}