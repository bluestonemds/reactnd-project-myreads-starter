import React, { Component } from 'react';

class ChangeShelf extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    handleChange = (event) => {
        this.props.onChangeShelf(
            {
            value:event.target.value,
            book:this.props.book
        }
        );
      }

    render() {
        return(
            <select value={this.props.shelf} onChange={this.handleChange}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        )
    }
}

export default ChangeShelf
