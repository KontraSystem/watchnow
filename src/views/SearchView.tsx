import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./../app/hooks"

import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import MovieImage from "../components/MovieImage"
import NavComponent from "../components/NavComponent"

import { handleDetailModal } from "../actions/index" 

export default function SearchView() {
  const state = useAppSelector((state: RootState) => state)
	const dispatch = useAppDispatch()

	return (
		<>
			<NavComponent/>
			<Container className="d-flex mt-4" >
				<Stack direction="horizontal" className="m-0 justify-content-center flex-wrap" gap={3}>
					{ state.searchFilter.movies.length ? state.searchFilter.movies.map((movie: Movie) => {
						return (
							<Container key={"container"+movie.id} className="m-0 search-movie-container align-items-center">
								<MovieImage 
									key={"movie-image-"+movie.id}
									favorite 
									movie={movie} 
									handleClick={(favorite: boolean, id: number) => dispatch(handleDetailModal(favorite, id, true))} 
								/>
							</Container>
						)
					}) : "Try a different search" }
				</Stack>
			</Container>
		</>
	)
}