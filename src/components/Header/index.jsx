import { Button, makeStyles, Popover } from '@material-ui/core';
import React from 'react';
import { userActions } from '../../store/actions/user';
import { userApi } from '../../utils/api/user';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserPicture } from '../../store/selectors';

const HeaderStyles = makeStyles({
  header: {
    backgroundColor: '#87BBA2',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  logout: {
    backgroundColor: '#D3C2CE',
    '&:hover': {
      backgroundColor: '#dc3939de',
    },
  },

  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',

    '& img': {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
  },
  profileFullName: {
    fontSize: 22,
  },
  profilePhoto: {
    display: 'flex',
  },
  profileInfo: {
    listStyle: 'none',
    fontSize: 16,
  },
  profilePopover: {
    maxWidth: 500,
  },
});

const Header = () => {
  const dispatch = useDispatch();
  const classes = HeaderStyles();
  const userData = useSelector(selectUserPicture);
  const handleLogout = async () => {
    dispatch(userActions.setIsAuth(false));
    dispatch(userActions.setUserData(null));
    userApi.logoutUser();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className={classes.header}>
      {userData && (
        <>
          <Button className={classes.logout} onClick={handleLogout}>
            logout
          </Button>
          <div onClick={handleClick} className={classes.profileHeader}>
            <span className={classes.profileFullName}>{userData.fullName}</span>
            <div className={classes.profilePhoto}>
              <img src={userData.picture} alt="" />
            </div>
          </div>
          <Popover
            className={classes.profilePopover}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}>
            <ul className={classes.profileInfo}>
              {Object.keys(userData).map((key) => (
                <li key={key}>
                  <span>{key}</span>: {userData[key]}
                </li>
              ))}
            </ul>
          </Popover>
        </>
      )}
    </div>
  );
};

export default Header;
