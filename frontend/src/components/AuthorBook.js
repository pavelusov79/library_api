import React from 'react'
import { useParams } from 'react-router-dom'


const BookItem = ({item, delete_book}) => {
    return ( 
        <tr>
            <td className="col-1">{item.id}</td>
            <td className="col-6 col-md-5 col-lg-4">{item.title}</td>
            <td className="col-2"><button className="btn btn-outline-primary" type="button" onClick={()=>delete_book(item.id)}>удалить</button></td>
        </tr> 
    )
}


const BookList = ({books, delete_book}) => {
    let { first_name } = useParams();
    let filtered_items = books.filter((item) => item.authors.find((i) => i == first_name ));
    return (
        <div className="container my-5">
            <h3 className="text-center font-italic mb-4">Список книг автора</h3>
            <div className="row justify-content-center">
                <div className="col-9 col-md-8 col-lg-7"> 
                    <table className="table">
                        <th className="col-1">ID</th>
                        <th className="col-6 col-md-5 col-lg-4">Название книги</th>
                        <th className="col-2"></th>
                        {filtered_items.map((item) => <BookItem item={item} delete_book={delete_book}/>)}
                    </table>
                </div>
            </div>
        </div>   
    )
    
}

export default BookList;
