import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./../app/hooks"

import ListGroup from "react-bootstrap/ListGroup"
import NavDropdown from 'react-bootstrap/NavDropdown';
import { handleDetailModal } from "../actions/index"

export default function MyListComponent() {
  const state = useAppSelector((state: RootState) => state)

	const dispatch = useAppDispatch()

	useEffect(() => {
		const favorites = JSON.parse(localStorage.getItem("favorites") ?? "[]")
    dispatch({ 
      type: "favorite-refresh", 
      payload: favorites
    })    
	}, [])

	return (
		<NavDropdown
      as={ListGroup}	
     	align="end"
      className="text-link-custom"
      title="My List"
    >
    		<>
        { state.favoriteMovies.length ? state.favoriteMovies.map((movie: Movie) => {
						return(
							<div key={movie.id}>
							<NavDropdown.Item 
								key={"item-"+movie.id} 
								className="custom-dropdown-item" 
								onClick={() => dispatch(handleDetailModal(false, movie.id, true))}
							>
								<img key={"image-"+movie.id} alt={movie.title} width={100} src={"https://image.tmdb.org/t/p/original/"+movie.poster_path}/>
								<div key={"divider-"+movie.id} className="vr mx-2"/>
								{movie.title}
							</NavDropdown.Item>
							<NavDropdown.Divider key={"divd-"+movie.id}/>
							</div>
						)
					}) :
        	(
        		<NavDropdown.Item className="custom-dropdown-item">
        			Your Favorite Movies Go Here!
        		</NavDropdown.Item>
      		)
			  }
				</>
    	</NavDropdown>
			
	)	
}