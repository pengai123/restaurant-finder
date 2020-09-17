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
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles({
	cardRoot: {
		maxWidth: 300,
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
		<Grid container spacing={3}>
			{props.restaurants.map((restaurant, idx) => {
				return (
					<Grid item xs={3} key={idx}>
						<Card className={classes.cardRoot}>
							<CardActionArea href={restaurant.restaurant.url} target="_blank">
								<CardMedia
									className={classes.cardMedia}
									image={restaurant.restaurant.thumb ? restaurant.restaurant.thumb : "https://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"}
									title={restaurant.restaurant.name}
								/>
							</CardActionArea>
							<CardContent>
								<Typography gutterBottom variant="subtitle1" >
									<Box fontWeight="fontWeightBold">
										{restaurant.restaurant.name}
									</Box>
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
										<Typography variant="caption" color="textSecondary">
											{restaurant.restaurant.user_rating.rating_text}
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={1}>
									<Grid item>
										<Typography variant="caption" color="textSecondary">
											<Box fontWeight="fontWeightBold">
												{displayPriceRange(restaurant.restaurant.price_range, restaurant.restaurant.currency)}
											</Box>
										</Typography>
									</Grid>
									<Grid item>
										<Typography variant="caption" color="textSecondary" noWrap>
											<Box fontStyle="italic" fontWeight="fontWeightBold">
												{restaurant.restaurant.cuisines}
											</Box>
										</Typography>
									</Grid>
								</Grid>
							</CardContent>

							<CardActions>
								<Button size="small" color="primary">
									Share
        				</Button>
								<Button size="small" color="primary">
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
