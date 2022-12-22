import React from "react";

import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"

import FavoriteButton from "./FavoriteButton"

type MovieImageProps = {
	movie: Movie,
	imageClass?: string,
	favorite?: boolean,
	handleClick: (favorite: boolean, id: number) => void
}

export default function MovieImage(props: MovieImageProps) {
	const { movie, handleClick, favorite, imageClass } = props


	return (
		<Card key={"card-"+movie.id} className="btn-custom m-2" >
			{ favorite  ? movie.poster_path ?
				(
					<>
						<Container key={"container"+movie.id} className={"me-0 pe-0 position-absolute d-flex justify-content-end"} fluid>
							<FavoriteButton 
								key={"favorite-"+movie.id}
								movie={movie}
								className="only-rounded-bottom-left-to-top-right"
							/>
						</Container>
						<img
							key={"image-"+movie.id} 
							className={"rounded "+imageClass}						
							onClick={() => handleClick(false, movie.id)}
							src={"https://image.tmdb.org/t/p/original/"+movie.poster_path}
							alt={movie.title}
						/>
					</>
				) : <h4>{movie.title}</h4>
				: 
				<img 
					key={"image-"+movie.id} 
					className="rounded"
					onClick={() => handleClick(false, movie.id)} 
					src={"https://image.tmdb.org/t/p/original/"+movie.poster_path} 
					alt={movie.title}
				/>
			}
		</Card>
	)
}