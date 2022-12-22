import React from 'react';
import { useAppDispatch, useAppSelector } from "./../app/hooks"

import Container from "react-bootstrap/Container"
import CarouselMovieComponent from "../components/CarouselMovieComponent"
import NavComponent from "../components/NavComponent"
import { handleDetailModal } from "../actions/index"
export default function DiscoveryView() {
	const dispatch = useAppDispatch()
  const state = useAppSelector((state: RootState) => state)


	return (
    <>
    	<NavComponent/>
		  <Container fluid>
				<CarouselMovieComponent 
					favoriteToggle 
					title="Latest Releases" 
					list={state.discoverMovies.latestMovies} 
					handleClick={(favorite: boolean, id: number) => dispatch(handleDetailModal(favorite, id, true))} 
					/>
				{ state.discoverMovies.moviesByGenre.map((genre: MoviesByGenre) => {
						return genre.movies.length > 2 ? (
							<CarouselMovieComponent 
								key={genre.id}
								favoriteToggle 
								title={genre.name} 
								list={genre.movies} 
								handleClick={(favorite: boolean, id: number) => dispatch(handleDetailModal(favorite, id, true))} />
						) : null
					})
				}
			</Container>
		</>
	)
}