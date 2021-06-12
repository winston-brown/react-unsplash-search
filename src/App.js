import { useState } from 'react';
import { createApi } from 'unsplash-js';

const { REACT_APP_KEY } = process.env;

function App() {
  const [aquery, setQuery] = useState('');
  const [pics, setPics] = useState([]);

  const unsplash = createApi( {
    accessKey: REACT_APP_KEY,
  });

  function searchPhotos(e) {
    e.preventDefault();
    unsplash.search.getPhotos( { 
      query: aquery,
      page: 1,
      perPage: 10
    })
    .then( (result) => {
      if (result.errors) {
        console.log('ERROR || ', result.errors);
      } else {
        let theResults = result.response.results;
        console.log(theResults);
        setPics(result.response.results);
        console.log("PICS || ", pics);             
      }
    });
  }

  return (
    <div>
        <form onSubmit={searchPhotos}>
          <label htmlFor="query">
            📷
          </label>
          <input
            type="text"
            name="query"
            placeholder={`Try "cat" or "puppies`}
            value={aquery}
            onChange={(e) => setQuery(e.target.value)}
            />
          <button type="submit">SEARCH</button>
        </form>
        {pics.map( (pic) => (
          <div key ={pic.id}>
          <img alt={pic.alt_description} src={pic.urls.thumb} /> 
          </div>
        ))}
    </div>
  );
}

export default App;
