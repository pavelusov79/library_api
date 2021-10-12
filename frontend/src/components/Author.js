import React from 'react'
import {Link} from 'react-router-dom'


const AuthorItem = ({author}) => {
    return (
        <tr>
            <td className="col-1"><Link to={`author/biography/${author.id}/`}>{author.id}</Link></td>
            <td className="col-4 col-md-3 col-lg-2">{author.last_name}</td>
            <td className="col-4 col-md-3 col-lg-2">{author.first_name}</td>
            <td className="col-3 col-md-3 col-lg-2"><Link to={`author_books/${author.first_name}/`}>книги</Link></td>
        </tr>
    )
}


const AuthorList = ({items}) => {
    return (
        <div className="container my-5">
            <h3 className="font-italic text-center mb-5">Список авторов</h3>
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-7">  
                    <table className="table">
                        <th className="col-1">ID</th>
                        <th className="col-4 col-md-3 col-lg-2">Имя</th>
                        <th className="col-4 col-md-3 col-lg-2">Фамилия</th>
                        <th className="col-3 col-md-3 col-lg-2">Книги автора</th>     
                        {items.map((author) => <AuthorItem author={author} />)}
                    </table>
                </div>
            </div>
        </div>
    )
}


export default AuthorList;









































