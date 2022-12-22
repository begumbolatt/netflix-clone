import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies, getGenres} from "../store";
import {onAuthStateChanged} from "firebase/auth";
import {firebaseAuth} from "../utils/firebase-config";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import styled from "styled-components";
import SelectGenre from "../components/SelectGenre";


function TVShows() {

    const [isScroll, setIsScroll] = useState(false);
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ genres, type: "tv" }));
        }
    }, [genresLoaded]);

    const [user, setUser] = useState(undefined);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setUser(currentUser.uid);
        else navigate("/login");
    });

    window.onscroll = () => {
        setIsScroll(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    return (
        <Container>
            <div className="navbar">
                <Navbar isScrolled={isScroll} />
            </div>
            <div className="data">
                <SelectGenre genres={genres} type="tv"/>
                {
                    movies.length ? <Slider movies={movies} /> : <NotAvailable />
                }
            </div>
        </Container>
    );
}

const Container = styled.div`
    .data {
      margin-top: 8rem;
      .not-available {
        text-align: center;
        color: white;
        margin-top: 4rem;
      }
    }
`;

export default TVShows;