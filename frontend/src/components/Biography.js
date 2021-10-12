import React from 'react'
import { useParams } from 'react-router-dom'


const AuthorItem = ({authors}) => {
    let { id } = useParams();
    let author = authors.find((author) => author.id == id);
    
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <h3 className="mb-5 text-center font-italic">Биография (автор: {author.last_name} {author.first_name})</h3>
                <div className="col-12 col-md-10">
                    <p>{author.biography}</p>
                </div>
            </div>
        </div>
    )
}


export default AuthorItem;