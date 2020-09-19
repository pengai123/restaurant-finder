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
				<LocationOnOutlinedIcon />
				<Typography variant="subtitle1" >
					{props.location}
				</Typography>
			</Grid>
			<Grid item>
				<input name="newLocation"
					placeholder="Enter city name.."
					style={{ height: "25px", width: "200px" }}
					onChange={onChange}
				>
				</input>
			</Grid>
			<Grid item>
				<Button size="small" variant="contained"
					style={{ fontWeight: "bold" }}
					onClick={handleClick}
				>
					GO!
        </Button>
			</Grid>
		</Grid>
	)
}
