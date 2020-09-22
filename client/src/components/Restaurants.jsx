import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
	cardRoot: {
		maxWidth: 280,
		height: "100%"
	},
	cardMedia: {
		height: 200,
	},
});


export default function Restaurants(props) {
	const classes = useStyles();

	let displayPriceRange = function (range, currency) {
		let result = "";
		for (let i = 0; i < range; i++) {
			result += currency;
		}
		return result;
	}


	return (
		<Grid container
			direction="row"
			justify="center"
			spacing={3}
		>
			{props.restaurants.map((restaurant, idx) => {
				return (
					<Grid item sm={3} xs={12} key={idx} >
						<Card className={classes.cardRoot} style={{ backgroundColor: "#FFF4EC" }}>
							<CardActionArea href={restaurant.restaurant.url} target="_blank">
								<CardMedia
									className={classes.cardMedia}
									image={restaurant.restaurant.thumb ? restaurant.restaurant.thumb : "https://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"}
									title={restaurant.restaurant.name}
								/>
							</CardActionArea>
							<CardContent>
								<Typography gutterBottom variant="subtitle1" style={{ fontWeight: "bold" }} >
									{restaurant.restaurant.name}
								</Typography>
								<Grid container spacing={1}>
									<Grid item>
										<Rating
											name="read-only"
											value={Number(restaurant.restaurant.user_rating.aggregate_rating)}
											precision={0.1}
											size="small"
											readOnly
										/>
									</Grid>
									<Grid item>
										<Typography variant="caption" style={{ color: "#" + restaurant.restaurant.user_rating.rating_color, fontWeight: "bold" }}>
											{restaurant.restaurant.user_rating.rating_text}
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={1}>
									<Grid item>
										<Typography variant="caption" style={{ color: "red", fontWeight: "bold" }}>
											{displayPriceRange(restaurant.restaurant.price_range, restaurant.restaurant.currency)}
										</Typography>
									</Grid>
									<Grid item>
										<Typography variant="caption" color="textSecondary" style={{ fontWeight: "bold", fontStyle: "italic" }} noWrap>
											{restaurant.restaurant.cuisines}
										</Typography>
									</Grid>
								</Grid>
							</CardContent>
							<CardActions>
								<Button size="small" style={{ color: "grey", fontWeight: "bold" }}>
									Share
        				</Button>
								<Button size="small" style={{ color: "grey", fontWeight: "bold" }}>
									Learn More
        				</Button>
							</CardActions>
						</Card>
					</Grid>
				)
			})}
		</Grid>
	)
}
