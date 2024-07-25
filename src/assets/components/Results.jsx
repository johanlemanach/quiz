import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export default function Results({ element, artwork }) {
  const { name } = useContext(UserContext);

  return (
    <div>
      <p>
        <strong>{name}</strong>, your element is: {element}
      </p>
      {artwork ? (
        <div className="artwork">
          <img src={artwork} alt={`Image of ${element}`} />
        </div>
      ) : (
        <p>No image found.</p>
      )}
    </div>
  );
}
