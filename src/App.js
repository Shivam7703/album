import React, { useState, useEffect } from 'react';
import './App.css';
const AlbumsComponent = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({ title: '' });

  useEffect(() => {
    fetchAlbums();
  }, []);

  // Function to fetch albums
  const fetchAlbums = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      if (!response.ok) {
        throw new Error('Failed to fetch albums.');
      }
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to add a new album
  const addAlbum = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAlbum),
      });
      if (!response.ok) {
        throw new Error('Failed to add album.');
      }
      const data = await response.json();
      setAlbums([...albums, data]); // Add the new album to the state
      setNewAlbum({ title: '' }); // Reset the newAlbum state
    } catch (error) {
      console.error(error);
    }
  };

  // Function to update an album
  const updateAlbum = async (albumId, updatedAlbum) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${albumId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedAlbum),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update album.');
      }
      const data = await response.json();
      setAlbums(albums.map((album) => (album.id === albumId ? data : album)));
    } catch (error) {
      console.error(error);
    }
  };

  // Function to delete an album (dummy call)
  const deleteAlbum = async (albumId) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
        method: 'DELETE',
      });
      setAlbums(albums.filter((album) => album.id !== albumId)); // Remove the album from the state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="albums-container">
    <h2 className="albums-title">Albums</h2>
    <ul className="albums-list">
      {albums.map((album) => (
        <li key={album.id} className="album-item">
          {album.title}
          <button className="album-btn" onClick={() => updateAlbum(album.id, { title: 'Updated Album' })}>
            Update
          </button>
          <button className="album-btn" onClick={() => deleteAlbum(album.id)}>Delete</button>
        </li>
      ))}
    </ul>
    <div className="add-album">
      <h3>Add New Album</h3>
      <input
        className="album-input"
        type="text"
        value={newAlbum.title}
        onChange={(e) => setNewAlbum({ title: e.target.value })}
      />
      <button className="album-btn" onClick={addAlbum}>Add Album</button>
    </div>
  </div>
  );
};

export default AlbumsComponent;
