import { configureStore } from '@reduxjs/toolkit';
import { AnyAction } from "redux"
import { isEqual } from "underscore";

const defaultFilter = {
  year: [1900, 2022],
  genre: [],
  language: "",
  rating: [0, 10],
  runtime: [0, 463]
}

function discoverReducer(
  state: { 
    moviesByGenre: Array<MoviesByGenre>, 
    latestMovies: Array<Movie>
  } = { moviesByGenre: [], latestMovies: [] }, 
  action: AnyAction 
) {
  switch (action.type) {
    case "load-popular":
      return { ...state, moviesByGenre: action.payload }
    case "load-latest":
      return { ...state, latestMovies: action.payload }
    default:
      return state 
  }
}

function detailMovieReducer(state: MovieDetails | null = null, action: AnyAction) {
  switch(action.type) {
    case "load-base-detail":
      return { ...state, ...action.payload }
    case "load-detail-images":
      return { ...state, images: action.payload }
    case "load-detail-videos":
      return { ...state, videos: action.payload }
    case "load-detail-similar":
      return { ...state, similarMovies: action.payload }
    case "load-detail-credits":
      return { ...state, credits: action.payload }
    case "clean-details":
      return action.payload
    default:
      return state
  }
}

function searchFilterReducer(
  state: { 
    filterCurrent: FilterObject, 
    searchCurrent: string | null, 
    movies: Array<Movie>,
    default: boolean
  } = { filterCurrent: defaultFilter, searchCurrent: null, default: true, movies: [] }, 
  action: AnyAction
) {
  switch(action.type) {
    case "load-filter-search":
      if(state.movies.length) {
        return { ...state, movies: action.payload }
      }
      return { ...state, movies: action.payload }
    case "set-filter":
      let filterNew = { ...state.filterCurrent }
      Object.assign(filterNew, action.payload)
      
      if(isEqual(filterNew, defaultFilter)) {
        return { ...state, filterCurrent: filterNew, movies: [], default: true }
      }
      return { ...state, searchCurrent: null, filterCurrent: filterNew, default: false }
    case "reset-filter":
      return { 
        ...state, 
        filterCurrent: { 
          year: [1900, 2022],
          genre: [],
          language: "",
          rating: [0, 10],
          runtime: [0, 463]
       }, 
        movies: [],
        default: true
      }
    case "set-search":
      return { ...state, filterCurrent: defaultFilter, searchCurrent: action.payload, movies: action.payload ? state.movies : [] }
    default: 
      return state
  }
}

function favoritesReducer(
  state: Array<Movie> = [], 
  action: AnyAction 
) {
  switch(action.type) {
    case "favorite-refresh":
      return action.payload
    case "load-new-favorite":
      return [...state, action.payload]
    case "load-favorites":
      return action.payload
    default:
      return state
  }
}

function showModalReducer(
  state: boolean = false,
  action: AnyAction 
) {
  switch(action.type) {
    case "showModal":
      return action.payload
    default:
      return state
  }
}

export const store = configureStore({
  reducer: {
    discoverMovies: discoverReducer,
    movieDetails: detailMovieReducer,
    searchFilter: searchFilterReducer,
    favoriteMovies: favoritesReducer,
    showModal: showModalReducer
  }
});

//133b224b26299e8c9385017db44679ed

/*
  genre: {
    id: number,
    name: string,
    movieSets: [[], [], [], []]
  }
*/