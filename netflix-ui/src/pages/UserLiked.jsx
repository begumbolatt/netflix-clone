import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchMovies, getGenres, getUserLikedMovies} from "../store";
import {onAuthStateChanged} from "firebase/auth";
import {firebaseAuth} from "../utils/firebase-config";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

function UserLiked() {
    const [isScroll, setIsScroll] = useState(false);
    const [email, setEmail] = useState(undefined);

    const movies = useSelector((state) => state.netflix.movies);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setEmail(currentUser.email);
        else navigate("/login");
    });

    useEffect(() => {
        if(email) {
            dispatch(getUserLikedMovies(email))
        }
    }, [email]);


    window.onscroll = () => {
        setIsScroll(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    return (
        <Container>
            <Navbar isScrolled={isScroll} />
            <div className="content flex column">
                <h1>My List</h1>
                <div className="grid flex">
                    {movies.map((movie,index) => {
                        return (
                            <Card movieData={movie} index={index} key={movie.id} isLiked={true} />
                        )
                    })}
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
  .content {
    margin: 8rem 2.3rem 2.3rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;

export default UserLiked;