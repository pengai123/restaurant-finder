import React, { useState } from 'react'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	location: {
		color: "white",
		fontWeight: "bold"
	},
	input: {
		height: "37px",
		width: "250px",
		color: "white",
		fontWeight: "bold",
		borderRadius: "5px",
		paddingLeft: "1em",
		borderColor: "#edf6f9",
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

	const onChange = function (e) {
		setNewLoc(e.target.value)
	}

	const handleClick = function (e) {
		e.preventDefault();
		if (newLoc) {
			props.changeLocation(newLoc);
			setNewLoc("")
		}
	}

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && newLoc) {
			props.changeLocation(newLoc);
			setNewLoc("")
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
				<LocationOnOutlinedIcon />
				<Typography variant="subtitle1" >
					{props.location}
				</Typography>
			</Grid>
			<Grid item>
				<input name="newLocation"
					placeholder="Enter city name here.."
					className={classes.input}
					value={newLoc}
					onChange={onChange}
					onKeyPress={handleKeyPress}
				>
				</input>
			</Grid>
			<Grid item>
				<Button size="large" variant="contained"
					className={classes.newLocBtn}
					onClick={handleClick}
				>
					GO!
        </Button>
			</Grid>
		</Grid>
	)
}
