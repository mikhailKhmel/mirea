import React, { Component } from 'react';
import './item-status-filter.css'

export default class ItemStatusFilter extends Component {
    state = {
        filterStatus: this.props.filter
    };

    buttons = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'done', label: 'Done' }
    ];

    changeFilter = (newFilter) => {
        const { onFilterTodoData } = this.props;
        this.setState({ filterStatus: newFilter });
        onFilterTodoData(newFilter);
    };

    render() {
        let className = "btn";

        const buttons = this.buttons.map((el) => {

            return (
                <button key={el.name} type="button" className={this.state.filterStatus === el.name ? className.concat(" btn-info") : className.concat(" btn-outline-secondary")}
                    onClick={() => this.changeFilter(el.name)}>
                    {el.label}
                </button>
            );
        })

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}
