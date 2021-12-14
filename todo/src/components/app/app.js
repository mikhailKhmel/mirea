import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './app.css';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

export default class App extends Component {
    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
        ],
        search: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label: label,
            important: false,
            id: uuidv4(),
            done: false
        };
    }

    toggleProperty(arr, id, propName) {
        const currentItem = arr.find(x => x.id === id);
        const currentIndex = arr.findIndex(x => x.id === id);
        return [
            ...arr.slice(0, currentIndex),
            { ...currentItem, [propName]: !currentItem[propName] },
            ...arr.slice(currentIndex + 1)
        ];
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: [
                    ...todoData.filter(el => el.id !== id)
                ]
            };
        })
    };

    addItem = (label) => {
        this.setState(({ todoData }) => {
            const newItem = this.createTodoItem(label);

            const newArray = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newArray
            };
        })
    };

    searchItems = (items, searchText) => {
        if (searchText.length === 0) {
            return items;
        }

        return items.filter(x => x.label.toLowerCase().includes(searchText.toLowerCase()));
    };

    markImportantItem = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    filterItems = (items) => {
        const { filter } = this.state;
        if (filter === 'all') {
            return items;
        }
        else if (filter === 'active') {
            return items.filter(x => !x.done);
        }
        else if (filter === 'done') {
            return items.filter(x => x.done);
        }
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    onSearchTodoData = (searchText) => {
        this.setState({ search: searchText });
    };

    onFilterTodoData = (filter) => {
        this.setState({ filter });
    };


    render() {
        const { todoData, search } = this.state;
        const doneCount = todoData.filter(x => x.done).length;
        const toDoCount = todoData.filter(x => !x.done).length;

        var visibleItems = this.searchItems(this.filterItems(todoData), search);
        return (
            <div className="todo-app">
                <AppHeader toDo={toDoCount}
                    done={doneCount} />

                <div className="top-panel d-flex">
                    <SearchPanel onFilterTodoData={this.onSearchTodoData} />
                    <ItemStatusFilter onFilterTodoData={this.onFilterTodoData} filter={this.state.filter} />
                </div>


                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onMarkImportant={this.markImportantItem}
                    onToggleDone={this.onToggleDone}
                />

                <ItemAddForm onAddItem={this.addItem} />
            </div>
        );
    }
}