import React, { useEffect, useCallback } from "react"
import { debounce } from "underscore"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { 
	getPopularMovies, 
	getLatestMovies, 
	getMovieDetails, 
	getSearchMovies, 
	getSimilarMovies, 
	getDetailCredits, 
	getDetailMedia,
	getFilteredMovies
} from "../api/index"

export const handleDetailModal = (favorite: boolean, movieId: number, showModal: boolean = false) => async (dispatch: AppDispatch) => {
	if(!favorite) {
		dispatch({ type: "clean-details", payload: null })
	 	dispatch({ type: "showModal", payload: showModal})

  	if(showModal) {
	  	dispatch(getMovieDetails(movieId))	
  	}
	}
}

export const handleFavorite = (movie: Movie) => async (dispatch: AppDispatch) => {
	let favorites = JSON.parse(localStorage.getItem("favorites") ?? "[]")
	const movieExists = favorites.find((fav: Movie) => fav.id === movie.id)
	
	if(movieExists) {
		favorites = favorites.filter((fav: Movie) => fav.id !== movieExists.id)
		dispatch({ type: "load-favorites", payload: favorites})
	} else {
		favorites.push(movie)
		dispatch(getMovieDetails(movie.id, "load-new-favorite"))
	}

	localStorage.setItem("favorites", JSON.stringify(favorites))
}

export const handleSliderChange = (key: string, value: number | Array<number>) => (dispatch: AppDispatch) => {
	dispatch({ type: "set-filter", payload: { 
		[key]: value as Array<number>,
		default: false
	}})
}

export const handleFilterToggle = <T, >(key: string, val: T, current: Array<T>) => (dispatch: AppDispatch) => {
	dispatch({ type: "set-filter", payload: {
		[key]: Number.isInteger(val) ? current.includes(val) ? current.filter((item) => item !== val) : [val].concat(current) : val
	}})
}

export const handleFilterReset = () => (dispatch: AppDispatch) => {
	dispatch({ type: "reset-filter", payload: null })
}

export default function ActionWrapper(props: { children: React.ReactNode }) {
  const state = useAppSelector((state: RootState) => state)
	const dispatch = useAppDispatch()

	const debounceFilterMovies = useCallback(
		debounce(
			(filter: FilterObject, currentMovies: Array<Movie>) => dispatch(getFilteredMovies(filter, currentMovies)), 
			600, 
			false
			), 
		[])

	const debounceSearchMovies = useCallback(
		debounce(
			(search: string, currentMovies: Array<Movie>) => dispatch(getSearchMovies(search, currentMovies)), 
			500, 
			false
		), 
	[])

	useEffect(() => {
    dispatch(getPopularMovies())
    dispatch(getLatestMovies())
  },[])

  useEffect(() => {
		if(state.movieDetails) {
			dispatch(getSimilarMovies(state.movieDetails.id))
			dispatch(getDetailCredits(state.movieDetails.id))
			dispatch(getDetailMedia(state.movieDetails.id, "images"))
			dispatch(getDetailMedia(state.movieDetails.id, "videos"))
		}
	}, [state.movieDetails?.id])

  useEffect(() => {  
  	
    debounceSearchMovies(state.searchFilter.searchCurrent, state.searchFilter.movies)
		if(!state.searchFilter.default) {
    	debounceFilterMovies(state.searchFilter.filterCurrent, state.searchFilter.movies)
    }
  }, [state.searchFilter.searchCurrent, state.searchFilter.filterCurrent])

	return(
		<div style={{ backgroundColor: "#10161D"}}>
			{props.children}
		</div>
	)
}