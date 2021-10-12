import React from 'react'


const BookItem = ({book}) => {
    return (
        <tr>
            <td class="col-2 col-md-1 col-lg-1">{book.id}</td>
            <td class="col-6">{book.title}</td>
            <td class="col-4 col-md-4 col-lg-3">{book.authors}</td>
        </tr>
    )
}


const BookList = ({books}) => {
    return (
        <div class="container my-5">
            <h3 class="font-italic text-center mb-5">Список книг</h3>
            <div class="row justify-content-center">
                <div class="col-12 col-md-11 col-lg-10">  
                    <table class="table">
                        <thead>
                            <th class="col-2 col-md-1 col-lg-1">ID</th>
                            <th class="col-6">Название книги</th>
                            <th class="col-4 col-md-4 col-lg-3">Авторы</th>
                        </thead>
                        <tbody>
                            {books.map((book) => <BookItem book={book} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export default BookList;









































