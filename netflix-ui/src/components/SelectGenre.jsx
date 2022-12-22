import React from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {fetchDataByGenre} from "../store";

function SelectGenre({genres, type}) {

    const dispatch = useDispatch();

    return (
        <Select classname="flex" onChange={(e) => dispatch(fetchDataByGenre({genre: e.target.value, type}))}>
            {genres.map((genre) => {
                return (
                    <option value={genre.id} key={genre.id} >{genre.name}</option>
                )
            })}
        </Select>
    );
}

const Select = styled.select` 
  margin-left: 3rem;
  cursor: pointer;
  font-size: 1.3rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
`;

export default SelectGenre;