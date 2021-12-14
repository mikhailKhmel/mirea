import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import ItemDetails from '../item-details';
import ItemList from '../item-list';
import Row from '../row';

import './person-page.css';

class ErrorBoundry extends Component {
    state = {
        hasError: false
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        return this.props.children;
    }
}

export default class PersonPage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 5
    }

    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson });
    };

    render() {

        const itemList = (
            <ItemList onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople} >
                {(i) => `${i.name} (${i.birthYear})`}
            </ItemList>
        );

        const itemDetails = (
            <ItemDetails itemId={this.state.selectedPerson} getData={this.swapiService.getPerson} />
        );

        return (
            <ErrorBoundry>
                <Row left={itemList} right={itemDetails} />
            </ErrorBoundry>
        );
    }
}