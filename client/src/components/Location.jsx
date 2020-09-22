import React, { useState } from 'react'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles ({
	location: {
		color: "white", 
		fontWeight: "bold"
	},
	input: {
		height: "25px", 
		width: "200px", 
		color: "white", 
		fontWeight: "bold", 
		borderRadius: "5px", 
		paddingLeft: "1em",
		backgroundColor: "transparent"
	},
	newLocBtn: {
		fontWeight: "bold", 
		backgroundColor: "grey"
	}
});


export default function Location(props) {

	const classes = useStyles();
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
				className={classes.location}
			>
				<LocationOnOutlinedIcon  />
				<Typography variant="subtitle1" >
					{props.location}
				</Typography>
			</Grid>
			<Grid item>
				<input name="newLocation"
					placeholder="Enter city name here.."
					className={classes.input}
					onChange={onChange}
				>
				</input>
			</Grid>
			<Grid item>
				<Button size="small" variant="contained"
					className={classes.newLocBtn}
					onClick={handleClick}
				>
					GO!
        </Button>
			</Grid>
		</Grid>
	)
}
