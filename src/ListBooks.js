import React, { Component } from 'react';
import ChangeShelf from './ChangeShelf';

class ListBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shelf: props.shelf,
      books: []
    }
  }

  componentWillReceiveProps (nextProps) {
       let currentBooks = nextProps.books.filter((book) => (book.shelf === this.props.shelf))
       this.setState({
       books:currentBooks
    }) 
  }

  getValue  = (shelf) =>  {
      if (shelf.value !== 'none'){
      this.props.onChangeBookStatus(
        {
          shelf:shelf.value,
          book:shelf.book
        }
      )
    }
  }

    render(){
        return (
        <div className="bookshelf-books">
                <ol className="books-grid">
             {this.state.books.map((book,i)=>(
                   <li key={i}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                           <ChangeShelf 
                           onChangeShelf={this.getValue}
                           book={book}
                           shelf={this.props.shelf}
                           /> 
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