import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');

  function submitReview() {
    Axios.post('http://localhost:2030/api/insert', {
      movieName,
      movieReview: review
    });
    setMovieList([...movieReviewList, { movieName, removieReview: review }]);
  }

  function deleteReview(movie) {
    Axios.delete(`http://localhost:2030/api/delete/${movie}`);
  }

  function updateReview(movie) {
    Axios.put('http://localhost:2030/api/update', {
      movieName: movie,
      movieReview: newReview
    });
    setNewReview('');
  }
  useEffect(() => {
    Axios.get('http://localhost:2030/api/get').then((response) => {
      setMovieList(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Crud</h1>
      <input type="text" placeholder="Movie name" onChange={(event) => setMovieName(event.target.value)} />
      <input type="text" placeholder="Movie review" onChange={(event) => setReview(event.target.value)} />
      <button type="button" onClick={submitReview}>Submit</button>
      <div>
        {
          movieReviewList?.map((val) => (
            <h1 key={val.id}>
              Movie name:
              {val.movieName}
              {' '}
              | Movie Review:
              {val.movieReview}
              <button type="button" onClick={() => deleteReview(val.movieName)}>Delete</button>
              <input
                type="text"
                placeholder="New update"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button type="button" onClick={() => { updateReview(val.movieName); }}>Update</button>

            </h1>
          ))
        }
      </div>
    </div>
  );
}

export default App;
