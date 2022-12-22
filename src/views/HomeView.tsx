import React from "react";
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';


import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"
import NavComponent from "../components/NavComponent"

export default function HomeView() {
	const navigation = useNavigate()
	return (
		<>
			<NavComponent/>
			<Container className="home-container p-5 d-block" fluid>
			<Stack gap={3}>
				<Row className="d-flex align-items-center" >
					<Col sm={6}>
						<Stack>
							<h1>All your streaming desires<br/> in one app!</h1>
							<p>Get personal recommendations and offers for your favorite films across all platforms...</p>
							<Stack direction="horizontal" gap={4}>
								<Button className="btn-custom" onClick={() => navigation("/discover")} >Discover</Button>
								<Button className="btn-custom" onClick={() => navigation("/#func")} >Functionalities</Button>
							</Stack>
						</Stack>
					</Col>
					<Col sm={6}>
						<Player
							src="https://assets2.lottiefiles.com/private_files/lf30_bb9bkg1h.json"
							className="player"
							autoplay
							loop
						/>
					</Col>
				</Row>
				<Row href="#func" className="d-flex align-items-center">
					<Col sm={6}>
						<Player
							src="https://assets3.lottiefiles.com/packages/lf20_46uzuabz.json"
							className="player"
							autoplay
							loop
						/>
					</Col>
					<Col sm={6} className="align-items-center">
						<h4>Everything in one place</h4>
						<h2>Your guide to streaming</h2>
						<p>Personal recommendations and offers on your favorite streaming platform</p>
					</Col>
				</Row>
				<Row className="d-flex align-items-center">
					<Col sm={6} className="align-items-center">
						<h4>Simply Search</h4>
						<h2>The one search bar to rule them all!</h2>
						<p>Search through all platforms using our optimated search functions...</p>
					</Col>
					<Col sm={6}>
						<Player
							src="https://assets2.lottiefiles.com/packages/lf20_l5qvxwtf.json"
							className="player"
							autoplay
							loop
						/>
					</Col>
				</Row>
				<Row className="d-flex align-items-center">
					<Col sm={6}>
						<Player
							src="https://assets8.lottiefiles.com/private_files/lf30_rcvcAS.json"
							className="player"
							autoplay
							loop
						/>
					</Col>
					<Col sm={6} className="align-items-center">
						<h4>A united front</h4>
						<h2>Favorite what you want and like</h2>
						<p>Use our favoriting feature to quickly list all the movies you love...</p>
					</Col>
				</Row>
				<Row  className="align-items-center justify-content-center">
						<Button onClick={() => navigation("/discover")} style={{ height: "10vh", width: "300px" }} className="p-4 btn-custom">Discover Movies</Button>
				</Row>
			</Stack>
			</Container>
		</>
	)
}