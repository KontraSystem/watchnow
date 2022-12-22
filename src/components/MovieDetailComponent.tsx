import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Spinner from 'react-bootstrap/Spinner';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"

import CarouselMovieComponent from "./CarouselMovieComponent"
import FavoriteButton from "./FavoriteButton"
import Carousel from "react-bootstrap/Carousel"
import { useAppSelector } from "./../app/hooks"

type MovieDetailProps = {
	show: boolean
	handleShow: (favorite: boolean, id: number, showModal: boolean) => void
}

export default function MovieDetailComponent(props: MovieDetailProps) {
	const { show, handleShow } = props;	
  const state = useAppSelector((state: RootState) => state)

	

	return (
		<Modal
			show={show}
			onHide={() => handleShow(false, 0, false)}
			backdrop="static"
			size="xl"
			centered
			
		>
			{ state.movieDetails ?
				(
					<>
					<Modal.Header 
						style={{
							backgroundColor: "#10161D",
							color: "grey",
							borderColor: "grey"
						}}
						closeButton 
						closeVariant="white"
					>
						<Container>
							<Row>
								<Col className="mb-2" >
									<Stack direction="horizontal" gap={3} >
										<FavoriteButton 
											movie={state.movieDetails} 
										/>
										<Modal.Title>{state.movieDetails.title}</Modal.Title>
									</Stack>
								</Col>
								<Col sm={12} className="d-flex align-items-center" >
									<Stack direction="horizontal" gap={3} >
											<p className="m-0" >{state.movieDetails.runtime+" mins"}</p>
											<div className="vr"/>
											{ state.movieDetails.spoken_languages.map((lang: { english_name: string }) => <p className="m-0 fst-italic">{lang.english_name}</p>) }
									</Stack>
								</Col>
							</Row>
						</Container>
					</Modal.Header>
					<Modal.Body
						style={{
							backgroundColor: "#10161D",
							color: "grey",
							borderColor: "grey"
						}}
					>
						<Stack>
							<Container fluid>
								<Row>
									{ state.movieDetails.credits ?
										<>
										<Col className="movie-detail-media" md={12} lg={6} >{ state.movieDetails.videos && state.movieDetails.images ? 
											(
												<Carousel 
													interval={null} 
													indicators={false} 
													nextIcon={<span aria-hidden="true" className=" carousel-control-next-icon" />}
												>
													{ state.movieDetails.videos.results.map((vid: MovieVideo) => {
														return (
															<Carousel.Item key={"carousel-item-"+vid.id}>
																<iframe style={{ width: "100%", height: 300}}
													        title='Youtube player'
													        key={"iframe-"+vid.id}
													        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
													        src={`https://youtube.com/embed/${vid.key}?autoplay=0`}>
																</iframe>
															</Carousel.Item>
														)
													})}
												</Carousel>
											)
											: <Spinner animation="border" />}
										</Col>
										<Col>
											<h3 className="fst-italic" >{state.movieDetails.tagline}</h3>
											<caption className="m-0 d-flex" >{state.movieDetails.overview}</caption>
											<Stack className="flex-wrap" direction="horizontal" gap={1}>
												<p className="m-0 fw-semibold">Directed by: </p>
												{ state.movieDetails.credits.crew
													.filter((crew: { job: string }) => crew.job === "Director")
													.map((crew: { name: string }) => <p key={"crew-"+crew.name} className="m-0 fw-light">{crew.name}</p>)
												}
											</Stack>
											<Stack className="flex-wrap" direction="horizontal" gap={1}>
												<p className="m-0 fw-semibold">Starring: </p>
												<p className="m-0 fw-light" >{state.movieDetails.credits.cast[0].name},</p>
												<p className="m-0 fw-light" >{state.movieDetails.credits.cast[1].name},</p>
												<p className="m-0 fw-light" >{state.movieDetails.credits.cast[2].name}...</p>
											</Stack>
										</Col> </> : null
									}
								</Row>
							</Container>
							<Container fluid>
								{ state.movieDetails.similarMovies ? 
									<CarouselMovieComponent 
										title="Similar Movies" 
										list={state.movieDetails.similarMovies}
										handleClick={(favorite, id) => handleShow(false, id, true)} 
									/> : <Spinner animation="border" />
								}
							</Container>
						</Stack>
					</Modal.Body>
					<Modal.Footer
						style={{
							backgroundColor: "#10161D",
							color: "grey",
							borderColor: "grey"
						}}
					>
					<Button className="btn-custom" onClick={() => handleShow(false, 0, false)} >Close</Button>	
					</Modal.Footer>
					</>
				) : <Spinner animation="border" role="status"/>
			}
		</Modal>
	)
}