import React from "react"

import "react-multi-carousel/lib/styles.css";
import Container from "react-bootstrap/Container"
import Carousel from "react-multi-carousel";

import MovieImage from "./MovieImage"

type CarouselComponentProps = {
	title: string,
	list: Array<Movie>,
	handleClick: (favorite: boolean, id: number) => void
	favoriteToggle?: boolean
}


const responsive = {
	fourk: {
		breakpoint: { min: 3000, max: 4000 },
		items: 10,
		slidesToSlide: 2
	},
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
    slidesToSlide: 2 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export default function CarouselMovieComponent(props: CarouselComponentProps) {
	const { title, list, handleClick, favoriteToggle } = props

	return (
		<Container className="mt-5 pb-2" fluid>
			<h2 className="ms-1 p-2 rounded title" >{title}</h2>
			<Carousel 
				responsive={responsive} 
				infinite
				removeArrowOnDeviceType={["tablet", "mobile"]}
			>
				{ list.map((movie: Movie, i) => {
						return (
							<MovieImage key={"movie-image-"+i} movie={movie} favorite={favoriteToggle} handleClick={handleClick} />
						)
					})
				}
			</Carousel>
		</Container>
	)
}