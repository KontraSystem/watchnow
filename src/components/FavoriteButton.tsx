import React from "react"
import { useAppDispatch, useAppSelector } from "./../app/hooks"
import { handleFavorite } from "../actions/index"

import { Star, StarFill } from "react-bootstrap-icons"
import Button from "react-bootstrap/Button"

type FavoriteButtonProps = {
	movie: Movie, 
	className?: string
}

export default function FavoriteButton(props: FavoriteButtonProps){
  const state = useAppSelector((state: RootState) => state)
	const dispatch = useAppDispatch()
	const { movie, className } = props;
	

	return (
		<Button className={className+" btn-custom" ?? "mt-2 btn-custom"} onClick={() => dispatch(handleFavorite(movie))}>
			{ state.favoriteMovies.find((fav: Movie)=> fav.id === movie.id) ? <StarFill color="#10161D" size={30}/> : <Star color="#10161D" size={30}/>}
		</Button>	
	)
}
