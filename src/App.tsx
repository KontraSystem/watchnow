import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import ActionWrapper, { handleDetailModal } from "./actions/index"
import { useAppDispatch, useAppSelector } from "./app/hooks"

import DiscoveryView from "./views/DiscoveryView"
import SearchView from "./views/SearchView"
import HomeView from "./views/HomeView"

import MovieDetailComponent from "./components/MovieDetailComponent"

function App() {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state: RootState) => state)
  const router = createBrowserRouter([
    {
      path: "/discover",
      element: state.searchFilter.movies.length ? <SearchView/> : <DiscoveryView/>
    },
    {
      path: "/",
      element: <HomeView/>
    }
  ])

  return (
    <ActionWrapper>
      <RouterProvider router={router}/>
      <MovieDetailComponent 
        show={state.showModal} 
        handleShow={(favorite: boolean, id: number, showModal: boolean) => dispatch(handleDetailModal(favorite, id, showModal))} 
      />
    </ActionWrapper>
  );
}

export default App;
