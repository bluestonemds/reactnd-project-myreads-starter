import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
  constructor() {
    super()
    this.state = {
      showSearchPage: false,
      books:[],
      query:''
    }
  }

  componentDidMount () {
    BooksAPI.getAll().then((books) => {
      this.setState({ books:books })
    })
  }

  changeBookStatus  = (bookStatus) => {
    let books = this.state.books

    books.map((book,index)=>{
      if(book.id === bookStatus.book.id)
      book.shelf = bookStatus.shelf
    })

    var preChangeBook = books.filter((book)=>(book.id === bookStatus.book.id))

    BooksAPI.update(preChangeBook[0],bookStatus.shelf).then(
      this.setState({
        books:books
      })
    ) 
  }

  search = () => {
    this.setState({showSearchPage:!this.setState.showSearchPage})
  }

  clearQuery = () => {
    this.setState({
      showSearchPage:false,
      query:''
    }) 
  }

  updateQuery = (query) => {
      this.setState({
        query:query.trim()
      })
  }

  render() {
    let showingBooks
    let query = this.state.query
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = this.state.books.filter((book) => match.test(book.authors))
      if (showingBooks.length === 0){
        showingBooks = this.state.books.filter((book) => match.test(book.title))
      }
    } else {
      showingBooks = this.state.books
    }
    return (
     
      <div className="app">
        <Link
              to='/search'
              className='pure-button search'
              onClick={this.search}
            >Search books</Link>
        {this.state.showSearchPage && (
          <Route exact path='/search' render={() => (
            <div className="search-books">
                  <div className="search-books-bar">
                  <Link
                    to='/'
                    className='close-search'
                    onClick={this.clearQuery}
                  ></Link>
                  <div className="search-books-input-wrapper">
                    {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} placeholder="Search by title or author"/>
                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid"></ol>
                </div>
              </div> 
          )}/>
        )}
        <Route path='/' render={({ history }) => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <ListBooks
                    onChangeBookStatus={this.changeBookStatus}
                    books={showingBooks}
                    shelf="currentlyReading"
                    />
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <ListBooks
                    onChangeBookStatus={this.changeBookStatus}
                    books={showingBooks}
                    shelf="wantToRead"
                    />
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <ListBooks
                    onChangeBookStatus={this.changeBookStatus}
                    books={showingBooks}
                    shelf="read"
                    />
                  </div>
                </div>
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
      )}/>
    </div>
    )
  }
}

export default BooksApp
