import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import SearchPage from './SearchPage'
import './App.css'

class BooksApp extends React.Component {
  constructor() {
    super()
    this.state = {
      books:[]
  }
}

  componentDidMount () {
    BooksAPI.getAll().then((books) => {
      this.setState({ books:books })
    })
  }


  handleBookShelfChange = (book,shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf

        // Filter out the book and append it to the end of the list
        // so it appears at the end of whatever shelf it was added to.
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
  }
 
  handleSearch = (book) =>{
    if (book){
      var homePageBooks 
      BooksAPI.getAll().then((books) => {
         for(let index=0;index<book.length;index++){
          for(let i=0;i<books.length;i++){
              if (books[i].id === book[index].id){
                book[index].shelf = books[i].shelf
                break
              }
            }
          }
          this.setState({
            books:book
          })
      })
    }
  }

  handleRefresh = (book) =>{
    BooksAPI.getAll().then((books) => {
      this.setState({ books:books })
    })
  }

  render() {
    let books = this.state.books
    return (
      <div className="app">
      <div className="open-search">
         <Link to="/search" />
      </div>
        <Route exact path="/" render={()=>(
            <BookList
            books={books}
            onBookShelfChange={this.handleBookShelfChange}
            />
        )}/>
        <Route path="/search" render={()=>(
          <SearchPage
          books={books}
          onBookShelfChange={this.handleBookShelfChange}
          onSearch={this.handleSearch}
          onRefresh={this.handleRefresh}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
