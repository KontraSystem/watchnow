import React, { useState, useEffect } from 'react';
import { debounce } from "underscore";
import { useNavigate, useLocation } from "react-router-dom"

import { List } from "react-bootstrap-icons"
import Container from 'react-bootstrap/Container';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Form from "react-bootstrap/Form"
import Offcanvas from "react-bootstrap/Offcanvas"
import Button from "react-bootstrap/Button"
import FilterComponent from "./FilterComponent"
import MyListComponent from "./MyListComponent"
import { useAppDispatch, useAppSelector } from "./../app/hooks"


export default function NavComponent() {
	const navigation = useNavigate()
	const navLocation = useLocation()
  const state = useAppSelector((state: RootState) => state)
	const dispatch = useAppDispatch()
	const [showOff, setShowOff] = useState(false)
	const [search, setSearch] = useState(state.searchFilter.searchCurrent ?? "")

	const handleClose = () => setShowOff(false);
  const handleShow = () => setShowOff(true);

	const handleSearch = (value: string) => {
		setSearch(value)
	}

	const debounceDispatch = debounce((value: string) => {
			dispatch({ type: "set-search", payload: value?.length > 0 ? value : null })
	}, 500)

	useEffect(() => {
		debounceDispatch(search)	
	}, [search])

	useEffect(() => {
		if(state.searchFilter.movies.length && navLocation.pathname === "/") {
			navigation("/discover")
		}
	}, [state.searchFilter.movies])

	return (
		<div className="sticky-top">
		<Navbar bg="dark" >
			<Container fluid>
				<Navbar.Brand href={"/"} className="fs-1">WatchNow</Navbar.Brand>
				<Offcanvas style={{ backgroundColor: "#19232e"}} placement="end" show={showOff} onHide={handleClose} responsive="md">
        <Offcanvas.Header closeButton>
					<Form>
						<Form.Control
							style={{
								backgroundColor: "#10161D",
								borderColor: "#fbc500",
								color: "grey"
							}}
							type="search"
							value={search}
							placeholder="Search For Your Next Favorite"
							onChange={(evt) => handleSearch(evt.target.value)}
							aria-label="search"
						/>
					</Form>
        </Offcanvas.Header>
				<Navbar.Collapse className="justify-content-end" >
					<Nav style={{color: "grey !important"}} className="mx-2">
						<Nav.Link><div onClick={(evt: React.SyntheticEvent) => navigation("/discover")} className="text-link-custom">Discover</div></Nav.Link>
						<MyListComponent/>
					</Nav>
					<Form className="search-bar">
						<Form.Control
							style={{
								backgroundColor: "#10161D",
								borderColor: "#fbc500",
								color: "grey"
							}}
							type="search"
							placeholder="Search For Your Next Favorite"
							value={search}
							onChange={(evt) => handleSearch(evt.target.value)}
							aria-label="search"
						/>
					</Form>
					</Navbar.Collapse>
      	</Offcanvas>
					<Button className="btn-custom offcanvas-button" onClick={handleShow} ><List/></Button>
			</Container>
		</Navbar>
	    { navLocation.pathname ==="/discover" ? <FilterComponent/> : null}
  	</div>
	)
}