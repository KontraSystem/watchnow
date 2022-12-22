import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

declare global {
	type MoviesByGenre = {
		id: number,
		name: string,
		currentIndex: number,
		movies: Array<Movies>
	}

	type Genre = {
		id: number,
		name: string
	}
	type Movie = {
	  adult: boolean,
	  backdrop_path: string,
	  genre_ids: Array<number>,
	  id: number,
	  original_language: string,
	  original_title: string,
	  overview: string,
	  popularity: number,
	  poster_path: string,
	  release_date: string,
	  title: string,
	  video: boolean,
	  vote_average: number,
	  vote_count: number,
	  favorite?: boolean
	};

	type MovieMedia = {
		aspect_ratio: number,
		file_path: string,
		height: number,
		iso_639_1: string | null,
		vote_average: number,
		vote_count: number,
		width: number
	}

	type MovieDepart = {
		 id: number,
		 known_for_department: string,
		 name: string,
		 original_name: string,
		 popularity: string,
		 profile_path: string,
		 cast_id: number,
		 character: string,
		 cerdit_id: string,
		 order: number,
		 job?: string
	}

	type MovieCredits = {
		id: number,
		cast: Array<MovieDepart>,
		crew: Array<MovieDepart>
	}

	type MovieImages = {
		id: number,
		backdrops: Array<MovieMedia>,
		posters: Array<MovieMedia>
	}

	type MovieVideo = {
		iso_639_1: string,
		iso_3166_1: string,
		name: string,
		key: string,
		site: string,
		size: number,
		type: string,
		official: boolean,
		published_at: string,
		id: string
	}	

	type MovieVideos = {
		id: number
		results: Array<MovieVideo>
	}

	interface MovieDetails extends Movie {
		production_companies: {
			name: string,
			id: number,
			logo_path: string | null,
			origin_country: string
		},
		production_countries: {
			iso_3166_1: string,
			name: string
		},
		runtime: number | null,
		spoken_languages: {
			english_name: string,
			iso_639_1: string,
			name: string
		},
		status: string,
		images?: MovieImages,
		videos?: MovieVideos,
		credits?: MovieCredits,
		similarMovies?: Array<Movie>
	
	}

	type FilterObject = {
		year: Array<number>,
		genre: Array<number>,
		language: string
		rating: Array<number>
		runtime: Array<number>
	}

	type FilterObjectKey = keyof typeof FilterObject


	type AppDispatch = typeof store.dispatch;
	type RootState = ReturnType<typeof store.getState>;
	type AppThunk<ReturnType = void> = ThunkAction<
	  ReturnType,
	  RootState,
	  unknown,
	  Action<string>
	>;

}