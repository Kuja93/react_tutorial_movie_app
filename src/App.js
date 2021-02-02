import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Responsive.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddToFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [favourites, setFavourites] = useState([]);

    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
        await fetch(url).then(res => res.json())
            .then(
                (result) => {
                    setMovies(result.Search);
                },
                (error) => {
                    console.log(error);
                }
            )
    };

    const addFavouriteMovie = (movie) => {
        const newFavouriteList = [...favourites, movie];
        setFavourites(newFavouriteList);
    };

    const removeFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.imdbID !== movie.imdbID
        );
        setFavourites(newFavouriteList);
    };

    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]);

    return (
        <div className='container-fluid movie-app'>
            <div className={"apes"}>
                <h1 >🦍🚀🌕</h1>
            </div>
            <div className='movieHeading row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Movies' />
                <img src="/toTheMoon.png" alt="stonks" className={"wsb"} />
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <div className='row'>
                <MovieList
                    movies={movies}
                    favouriteComponent={AddFavourites}
                    handleFavouritesClick={addFavouriteMovie}
                />
            </div>
            <div className='movieHeading row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Favourites' />
            </div>
            <div className='row'>
                <MovieList
                    movies={favourites}
                    handleFavouritesClick={removeFavouriteMovie}
                    favouriteComponent={RemoveFavourites}
                />
            </div>
        </div>
    );
};

export default App;