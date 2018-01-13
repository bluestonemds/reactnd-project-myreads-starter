import React, { Component } from 'react';
import ChangeShelf from './ChangeShelf';
import Books from './Books';

function BookList(props){
        return( 
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <Books
                                onChangeBookStatus={props.onBookShelfChange}
                                books={props.books}
                                shelf="currentlyReading"
                            />
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <Books
                                onChangeBookStatus={props.onBookShelfChange}
                                books={props.books}
                                shelf="wantToRead"
                            />
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <Books
                                onChangeBookStatus={props.onBookShelfChange}
                                books={props.books}
                                shelf="read"
                            />
                        </div> 
                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                </div>
            </div>
    )
}

export default BookList