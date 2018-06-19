import React, {Component} from 'react'
import './Trello.css'
import {Board} from 'react-trello'

const data = require('./data.json');

const handleDragStart = (cardId, laneId) => {
    console.log('drag started');
    console.log(`cardId: ${cardId}`);
    console.log(`laneId: ${laneId}`);
};

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended');
    console.log(`cardId: ${cardId}`);
    console.log(`sourceLaneId: ${sourceLaneId}`);
    console.log(`targetLaneId: ${targetLaneId}`);
};

class Trello extends Component {
    state = {boardData: {lanes: []}}

    setEventBus = eventBus => {
        this.setState({eventBus});
    }

    async componentWillMount() {
        const response = await this.getBoard();
        this.setState({boardData: response});
    }

    getBoard() {
        return new Promise(resolve => {
            resolve(data);
        });
    }
    completeCard = () => {
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'COMPLETED',
            card: {id: 'Grocery', title: 'Buy Grocery', label: '1 hour', description: 'Purchased all daily need grocery from the store'}
        });
        this.state.eventBus.publish({type: 'REMOVE_CARD', laneId: 'To-do', cardId: 'Grocery'});
    }

    shouldReceiveNewData = nextData => {
        console.log('New card has been added');
        console.log(nextData);
    }

	handleCardAdd = (card, laneId) => {
		console.log(`New card added to lane ${laneId}`);
		console.dir(card);
	}

    render() {
        return (
            <div className="Trello">
                <div className="Trello-header">
                    <h3>Gitanjali Bonzai Assignment</h3>
                </div>
                <div className="Trello-intro">
                    <button onClick={this.completeCard} style={{margin: 6}}>
                        Complete Grocery Purchase
                    </button>
                    <button onClick={this.completeCard} style={{margin: 6}}>
                        Call Plumber
                    </button> 
                    <button onClick={this.completeCard} style={{margin: 6}}>
                        EMI & Rent paid
                    </button>
                     <button onClick={this.completeCard} style={{margin: 6}}>
                        Weekly Meeting
                    </button>
  
                        <Board
                        editableonCardAdd={this.handleCardAdd}
                        data={this.state.boardData}
                        draggable
                        onDataChange={this.shouldReceiveNewData}
                        eventBusHandle={this.setEventBus}
                        handleDragStart={handleDragStart}
                        handleDragEnd={handleDragEnd}
                    />
                </div>
            </div>
        );
    }
};

export default Trello
