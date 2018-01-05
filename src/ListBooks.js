import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ListBooks extends Component {
  state = {
    "shelf": this.props.shelf
  }

    render(){
        console.log('Props', this.props)
        var books = this.props.books
        var currentBooks = books.filter((book) => (book.shelf === this.state.shelf))
        return (
        <div className="bookshelf-books">
                <ol className="books-grid">
             {currentBooks.map((book)=>(
                   <li>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
            ))}
            </ol>
            </div>
        )
    }
}

export default ListBooks