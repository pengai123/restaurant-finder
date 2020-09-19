import React, { useState } from 'react'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function Location(props) {

	let [newLoc, setNewLoc] = useState("")

	let onChange = function (e) {
		setNewLoc(e.target.value)
	}

	let handleClick = function (e) {
		e.preventDefault();
		if (newLoc) {
			props.changeLocation(newLoc);
		}
	}

	return (
		<Grid container
			direction="row"
			justify="center"
			alignItems="center"
			spacing={2}
		>
			<Grid container item
				direction="row"
				justify="center"
				alignItems="center"
			>
				<LocationOnOutlinedIcon style={{ color: "white", fontWeight: "bold" }} />
				<Typography variant="subtitle1" style={{ color: "white", fontWeight: "bold" }}>
					{props.location}
				</Typography>
			</Grid>
			<Grid item>
				<input name="newLocation"
					placeholder="Enter city name here.."
					style={{ height: "25px", width: "200px", color: "white", fontWeight: "bold", backgroundColor: "transparent" }}
					onChange={onChange}
				>
				</input>
			</Grid>
			<Grid item>
				<Button size="small" variant="contained"
					style={{ fontWeight: "bold", backgroundColor: "#774936" }}
					onClick={handleClick}
				>
					GO!
        </Button>
			</Grid>
		</Grid>
	)
}
