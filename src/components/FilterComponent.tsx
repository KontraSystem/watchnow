import React, { useState } from "react"
import { debounce } from "underscore"

import Stack from "react-bootstrap/Stack"
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ToggleButton from "react-bootstrap/ToggleButton"

import Slider from "rc-slider"
import type { SliderProps } from 'rc-slider';
import raf from 'rc-util/lib/raf';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

import { useAppDispatch, useAppSelector } from "./../app/hooks"
import { handleSliderChange, handleFilterReset, handleFilterToggle } from "../actions/index"

const HandleTooltip = (props: {
  value: number;
  children: React.ReactElement;
  visible: boolean;
  tipFormatter?: (value: number) => React.ReactNode;
}) => {
  const { value, children, visible, ...restProps } = props;

  const tooltipRef = React.useRef<any>();
  const rafRef = React.useRef<number | null>(null);

  function cancelKeepAlign() {
    raf.cancel(rafRef.current!);
  }

  function keepAlign() {
    rafRef.current = raf(() => {
      tooltipRef.current?.forcePopupAlign();
    });
  }

  React.useEffect(() => {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [value, visible]);

  return (
    <Tooltip
      placement="top"
      ref={tooltipRef}
      overlay={value}
      overlayInnerStyle={{minHeight: "auto"}}
      visible={visible}
      {...restProps}
    >
      {children}
    </Tooltip>
  );
};

const handleRender: SliderProps['handleRender'] = (node, props) => {
  return (
    <HandleTooltip value={props.value} visible={props.dragging}>
      {node}
    </HandleTooltip>
  );
};


const FilterSlider = (props: {
		handleChange: (value: Array<number>) => any, 
		property: string,
		value: Array<number>,
		step?: number
	}) => {
	const { step, handleChange, property, value } = props
	const defaultSlider: FilterObject = {
	  year: [1900, 2022],
	  rating: [0, 10],
	  runtime: [0, 463],
	  genre: [],
	  language: ""
	}

	const [sliderValue, setSliderValue] = useState(value)
	const debounceChange = debounce((val: Array<number>) => handleChange(val), 600)

	const sliderChange = (newValue: number | Array<number>) => {
		setSliderValue(newValue as Array<number> )
		debounceChange(newValue as Array<number>)
	}

	return (
			<Slider 
				range 
				onChange={sliderChange}
				allowCross={false}
				value={sliderValue as Array<number>}
				step={step ?? 1}
				min={defaultSlider[property as keyof FilterObject][0] as number}
				max={defaultSlider[property as keyof FilterObject][1] as number}
				marks={{
					[defaultSlider[property as keyof FilterObject][0]]: defaultSlider[property as keyof FilterObject][0],
					[defaultSlider[property as keyof FilterObject][1]]: defaultSlider[property as keyof FilterObject][1]
				}}
				handleRender={handleRender}
			/>
	)
}

const FilterOptions = <T, >(props: {
	option: { name: string, id: T }, 
	currentFilter: Array<T>,
	handleClick: (id: T) => any}
) => {
	const { option, currentFilter, handleClick } = props; 
	return (
			<ToggleButton 
				key={"toggle-"+option.id}
				id="genres-toggle"
				value={currentFilter.includes(option.id) ? 1 : 0} 
				type="checkbox"
	      className={currentFilter.includes(option.id) ? "btn-custom" : "btn-custom-outline"}
	      onClick={() => handleClick(option.id)}
      >
      	{option.name}
      </ToggleButton>
  )
}

export default function FilterComponent() {
  const state = useAppSelector((state: RootState) => state)
	const dispatch = useAppDispatch()

	return (
		<Container fluid className="title p-2">
			<Stack direction="horizontal" className="flex-wrap" gap={3}>
				<p className="m-0" >Filter</p>
				<div className="vr" />
				 { Object.keys(state.searchFilter.filterCurrent).map((filter) => {
				 	switch(filter) {
				 		case "year":
				 		case "rating":
				 		case "runtime":
				 			return (
				 				<OverlayTrigger 
				 					key={"overlay-"+filter}
									trigger="click" 
									placement="bottom" 
									overlay={
										<Popover key={"popover-"+filter} style={{ width: 200, backgroundColor: "#19232e" }} className="p-4">
											<FilterSlider
												key={"slider-"+filter}
												property={filter}
												value={state.searchFilter.filterCurrent[filter]}
												handleChange={(val: Array<number>) => dispatch(handleSliderChange(filter, val))}
												step={filter === "rating" ? 0.2 : 1}
											/>
										</Popover>
									}
								>
									<Button key={"button-"+filter} className="btn-custom-dark">{filter.charAt(0).toUpperCase() + filter.slice(1)}</Button>
								</OverlayTrigger>
			 				)
		 				case "genre":
		 				case "language":
		 					const list = filter === "genre" ? state.discoverMovies.moviesByGenre : [{ id: "hr", name: "Croatian" }, { id: "en", name: "English" }, { id: "it", name: "Italian" }, { id: "de", name: "German" }]
		 					return (
		 						<OverlayTrigger 
				 					key={"overlay-"+filter}
									trigger="click" 
									placement="bottom" 
									overlay={
										<Popover key={"overlay-"+filter} style={{ backgroundColor: "#19232e" }} className="p-3">
											<Stack key={"stack-"+filter} direction="horizontal" className="flex-wrap" gap={3}>
												{list.map((option: { id: number, name: string}) => {
													return (
														<FilterOptions<number>
															key={"filter-option-"+option.id}
															option={option}
															currentFilter={filter === "genre" ? state.searchFilter.filterCurrent.genre : state.searchFilter.filterCurrent.language}
															handleClick={
																(val: number) => dispatch(
																	handleFilterToggle<number>(
																		filter, 
																		val, 
																		filter === "genre" ? state.searchFilter.filterCurrent.genre : state.searchFilter.filterCurrent.language
																	)
															)}
														/>
											      )
												})}
											</Stack>
										</Popover>
									}
								>
									<Button key={"button-"+filter} className="btn-custom-dark">{filter.charAt(0).toUpperCase() + filter.slice(1)}</Button>
								</OverlayTrigger>
	 						)
				 	}
				 })}
				<Button onClick={() => dispatch(handleFilterReset())} className="btn-custom-dark">Reset</Button>
			</Stack>
		</Container>
	)
}