import { useEffect, useState } from 'react';
import './App.css';

const PATH = 'https://script.google.com/macros/s/AKfycbwqEWBMBuxVTTEWSzgekY1g08G1XD2fauTUlfkzAYsTcyQit2T1rM8L4FbpwEtrMi98oA/exec';
const API_NAME = 'display-record';
const PARAMETERS = 'serviceId=summer-dev-test';

const renderPhotos = (list) => {
  const PREFIX = 'Hello!';

  return (
    <div>
      {
        !!list.length && list.map(({
          comment,
          imageId,
          photoUrl,
        }) => (
          <img
            alt={`${PREFIX}_${comment}`}
            key={imageId}
            src={photoUrl}
            width={300}
          />
        ))
      }
    </div>
  );
};

function App() {
  const [photoList, setPhotoList] = useState([]);

  useEffect(() => {
    fetch(`${PATH}?${API_NAME}&${PARAMETERS}`, { method: 'GET' })
      .then((res) => res.json())
      .then(({ data }) => {
        setPhotoList(data);
      });
  }, []);

  if (!photoList.length) {
    renderPhotos(photoList);
  }

  return (
    <div className="App">
      {
          !!photoList.length && photoList.map(({
            comment,
            imageId,
            photoUrl,
          }) => (
            <img
              alt={comment}
              key={imageId}
              src={photoUrl}
              width={300}
            />
          ))
        }
    </div>
  );
}

export default App;
