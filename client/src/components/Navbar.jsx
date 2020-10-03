import React, { useState } from 'react'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		fontFamily: "Century Gothic, CenturyGothic, Geneva, AppleGothic, sans-serif",
		fontSize: "150%",
		fontWeight: "900",
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		paddingLeft: "1em",
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}));


export default function Navbar(props) {

	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const [keyWord, setKeyWord] = useState("");

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] = useState(false);
	const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [messageColor, setMessageColor] = useState("orange")


	const onChange = function (e) {
		if (e.target.value) {
			setKeyWord(e.target.value)
		}
	}

	const searchKeyword = function (e) {
		e.preventDefault();
		if (keyWord) {
			props.changeKeyword(keyWord);
		}
	}
	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setIsCreateAccountModalOpen(false);
		setIsLogInModalOpen(false);
		setUsername("");
		setPassword("");
		setMessage("")
	}

	const handleLogIn = () => {
		handleMenuClose();
		setIsLogInModalOpen(true);
		setIsModalOpen(true);
	}

	const handleCreateAccount = () => {
		handleMenuClose();
		setIsCreateAccountModalOpen(true);
		setIsModalOpen(true);
	}

	const logIn = (e) => {
		e.preventDefault();
		if (username && password) {
			axios.get(`/accounts/${username}`)
				.then(result => {
					console.log('result:', result.data)

					if (result.data.password === password) {
						setMessage("Login succeeded!")
						setMessageColor("green")
					} else {
						setMessage("Invalid username and password combination!")
						setMessageColor("red")
					}
				})
		} else {
			setMessage("Please fill username and password fields!")
			setMessageColor("red")
		}
	}

	const createAccount = (e) => {
		e.preventDefault();
		if (username && password) {
			let newAcnt = { username, password }
			axios.post("/accounts", newAcnt)
				.then(result => {
					console.log('result data:', result.data, typeof(result.data))
					if (result.data === "username existed") {
						setMessage("Username is already existed!")
						setMessageColor("red")
					} else {
						setMessage("Account created successfully!")
						setMessageColor("green")
					}
				})
		} else {
			setMessage("Please fill username and password fields!")
			setMessageColor("red")
		}
	}

	const handleInputChange = (e) => {
		if (e.target.name === "username") {
			setUsername(e.target.value);
		}

		if (e.target.name === "password") {
			setPassword(e.target.value);
		}
	}

	const LogInModal = (
		<form className="form">
			<h3 className="form-header">Log In</h3>
			<input className="form-input" name="username" placeholder="Enter username here.." onChange={handleInputChange} />
			<input className="form-input" name="password" placeholder="Enter password here.." onChange={handleInputChange} />
			<button className="form-btn" onClick={logIn} >Confirm</button>
			<p className="form-msg" style={{ color: messageColor }} >{message}</p>
		</form>
	)

	const CreateAccountModal = (
		<form className="form">
			<h3 className="form-header">Create Account</h3>
			<input className="form-input" name="username" placeholder="Enter username here.." onChange={handleInputChange} />
			<input className="form-input" name="password" placeholder="Enter password here.." onChange={handleInputChange} />
			<button className="form-btn" onClick={createAccount} >Create</button>
			<p className="form-msg" style={{ color: messageColor }} >{message}</p>
		</form>
	)

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleLogIn}>Log In</MenuItem>
			<MenuItem onClick={handleCreateAccount}>Create account</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="secondary">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label="show 11 new notifications" color="inherit">
					<Badge badgeContent={11} color="secondary">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar position="static" style={{ backgroundColor: "#8d99ae" }}>
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
						href="/"
					>
						<RestaurantMenuIcon className="logo" fontSize="large" />
					</IconButton>
					{/* variant="h6" */}
					<Typography className={classes.title} noWrap>  
						Restaurant Finder
						</Typography>
					<div className={classes.search}>
						<InputBase
							placeholder="Keyword here ..."
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							onChange={onChange.bind(this)}
						/>
						<IconButton onClick={searchKeyword.bind(this)}><SearchIcon /></IconButton>
					</div>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<IconButton aria-label="show 4 new mails" color="inherit">
							<Badge badgeContent={6} color="secondary">
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton aria-label="show 17 new notifications" color="inherit">
							<Badge badgeContent={0} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
			<Modal
				ariaHideApp={false}
				isOpen={isModalOpen}
				onRequestClose={handleModalClose}
				style={{
					content: {
						background: "#FFF4EC",
						top: '25%',
						left: '30%',
						right: '30%',
						bottom: '25%'
					}
				}}
			>
				{isLogInModalOpen && LogInModal}
				{isCreateAccountModalOpen && CreateAccountModal}
			</Modal>
		</div>
	);
}


//className = { this.state.view === 'feed' ? 'nav-selected' : 'nav-unselected' }