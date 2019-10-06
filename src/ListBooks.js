import React from 'react'
import * as BooksAPI from './BooksAPI'

export default class ListBooks extends React.Component{

    onChange(book,shelf){
    BooksAPI.update(book,shelf)
    .then(() => {
        this.props.reload()
    })
    }

render(){
    
    return(
        <div>

            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.titleSection}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {this.props.books.map((book) => (
                        <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                            { book.imageLinks && (
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            )}

                            {!book.imageLinks && (
                                <h6>{book.title}</h6>
                            )}
                            <div className="book-shelf-changer">
                                <select

                                value={book.shelf ? book.shelf: "none"}
                                onChange ={ (event) => {
                                this.onChange(book,event.target.value)
                                

                                }}>
                                <option value="move" disabled>Move to...</option>
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
          </div>
       
       
       </div>
        ) 
}
}

