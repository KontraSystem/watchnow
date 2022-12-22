export const getPopularMovies = () => async (dispatch: AppDispatch) =>  {
	let list: Array<Movie> = []
	fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=133b224b26299e8c9385017db44679ed&language=en-US")
		.then(resp => resp.json())
			.then((genreData: { genres: Array<Genre> }) => {
				for(let i = 1; i < 5; i++) {
					fetch("https://api.themoviedb.org/3/movie/popular?api_key=133b224b26299e8c9385017db44679ed&language=en-US&page="+i)
						.then(resp => resp.json())
							.then((data: { results: Array<Movie> }) => {
								list = list.concat(data.results)
								if(i >= 4) {
									const movieGenreList: Array<MoviesByGenre> = genreData.genres.map((genre) => {
										return { 
											id: genre.id,
											name: genre.name,
											currentIndex: 0,
											movies: list.filter((movie) => {
												if(movie.genre_ids.includes(genre.id)) {
													
													return true
												}
												return false
											})
										}
									})
									dispatch({ type: "load-popular", payload: movieGenreList })
								}
							})
				}
			})
}

export const getLatestMovies = () => async (dispatch: AppDispatch) => {
	fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=133b224b26299e8c9385017db44679ed&language=en-US&page=1")
		.then(resp => resp.json())
		.then((data: { results: Array<Movie> }) => {
			dispatch({ type: "load-latest", payload: data.results })
		})
}

export const getMovieDetails = (id: number, type: string = "load-base-detail") => async (dispatch: AppDispatch) => {
	fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key=133b224b26299e8c9385017db44679ed&language=en-US")
		.then(resp => resp.json())
		.then((data: Movie) => {
			dispatch({ type: type, payload: data })
		})
}

export const getDetailCredits = (id: number) => async (dispatch: AppDispatch) => {
	fetch("https://api.themoviedb.org/3/movie/"+id+"/credits?api_key=133b224b26299e8c9385017db44679ed&language=en-US")
	.then(resp => resp.json())
	.then((data: MovieCredits) => {
		dispatch({ type: "load-detail-credits" , payload: data })
	})
}

export const getDetailMedia = (id: number, key: string) => async (dispatch: AppDispatch) => {
	fetch("https://api.themoviedb.org/3/movie/"+id+"/"+key+"?api_key=133b224b26299e8c9385017db44679ed&language=en-US")
	.then(resp => resp.json())
	.then((data: MovieVideos | MovieImages) => {
		dispatch({ type: "load-detail-"+key , payload: data })
	})
}

export const getSimilarMovies = (id: number) => async (dispatch: AppDispatch) => {
	fetch("https://api.themoviedb.org/3/movie/"+id+"/similar?api_key=133b224b26299e8c9385017db44679ed&language=en-US&page=1")
	.then(resp => resp.json())
	.then((data: { results: Movie }) => {
		dispatch({ type: "load-detail-similar", payload: data.results })
	})
}

export const getFilteredMovies = (filter: FilterObject, currentMovies: Array<Movie>) => (dispatch: AppDispatch) => {
	fetch("https://api.themoviedb.org/3/discover/movie?api_key=133b224b26299e8c9385017db44679ed&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte="+filter.year[0]+"&release_date.lte="+filter.year[1]+"&vote_average.gte="+filter.rating[0]+"&vote_average.lte="+filter.rating[1]+"&with_runtime.gte="+filter.runtime[0]+"&with_runtime.lte="+filter.runtime[1]+"&with_genres="+filter.genre.join(",")+"&with_original_language="+filter.language+"&with_watch_monetization_types=flatrate")
	.then(resp => resp.json())
	.then((data: { results: Array<Movie>}) => {
		dispatch({ type: "load-filter-search", payload: data.results })
	})
}

export const getSearchMovies = (search: string | null, currentMovies: Array<Movie>) => (dispatch: AppDispatch) => {
	if(typeof search === "string") {
		fetch("https://api.themoviedb.org/3/search/movie?api_key=133b224b26299e8c9385017db44679ed&language=en-US&query="+encodeURI(search)+"&page=1&include_adult=false")
		.then(resp => resp.json())
		.then((data: { results: Array<Movie> }) => {
			dispatch({ type: "load-filter-search", payload: data.results})
		}).catch((error) => {
			console.error(error)
		})
	}
}