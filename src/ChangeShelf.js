import React, { Component } from 'react';

class ChangeShelf extends Component {

    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        this.props.onChangeShelf(
            this.props.book,event.target.value
        );
      }

    render() {
        let shelf
        if (!this.props.book.shelf){
            shelf = 'none'
        } else {
            shelf = this.props.book.shelf
        }
        return(
            <select value={shelf} onChange={this.handleChange}>
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
