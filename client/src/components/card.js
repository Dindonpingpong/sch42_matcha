import React from 'react';  

class Card extends Component {
    return () {
        <div className='col-md-4'>
            <div className='card mb-4'>
                <img src={data.path} className="card-img-top" alt=''/>
                <div className='card-body'>
                    <h5 className="card-title">{data.name}, {data.age}<span className="badge badge-primary badge-pill">{data.rate}</span></h5>
                    <h6 className="card-subtitle mb-2 text-muted">{data.location}</h6>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{data.sex}</li>
                        <li className="list-group-item">Heterofdass</li>
                        <li className="list-group-item">{data.tags.join(' ')}</li>
                    </ul>
                </div>
            </div>
        </div>
    }
};

export default Card;