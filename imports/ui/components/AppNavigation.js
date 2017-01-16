import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

const AppNavigation = ({ hasUser }) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/"><img src="/gather-logo.svg" alt="Gather" /></Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/meetups">
          <NavItem eventKey={ 1 } href="/meetups">Meetups</NavItem>
        </LinkContainer>
        <LinkContainer to="/events">
          <NavItem eventKey={ 2 } href="/events">Events</NavItem>
        </LinkContainer>
        { hasUser ? <NavDropdown eventKey={ 3 } title="Me" id="me-dropdown">
          <LinkContainer to="/me/events">
            <MenuItem eventKey={ 3.1 } href="/me/events">My Events</MenuItem>
          </LinkContainer>
          <LinkContainer to="/me/meetups">
            <MenuItem eventKey={ 3.2 } href="/me/meetups">My Meetups</MenuItem>
          </LinkContainer>
        </NavDropdown> : '' }
        { hasUser ? <NavDropdown eventKey={ 4 } title="Create" id="create-dropdown">
          <LinkContainer to="/events/create">
            <MenuItem eventKey={ 4.1 } href="/events/create">Create an Event</MenuItem>
          </LinkContainer>
          <LinkContainer to="/meetups/create">
            <MenuItem eventKey={ 4.2 } href="/meetups/create">Create a Meetup</MenuItem>
          </LinkContainer>
        </NavDropdown> : '' }
      </Nav>
      { hasUser ? <Nav pullRight>
        <NavDropdown eventKey={ 5 } title={ userName() } id="user-dropdown">
          <MenuItem eventKey={ 5.1 } onClick={ handleLogout }>Logout</MenuItem>
        </NavDropdown>
      </Nav> : <Nav pullRight>
        <LinkContainer to="/signup">
          <NavItem eventKey={ 6 } href="/signup">Sign Up</NavItem>
        </LinkContainer>
        <LinkContainer to="/login">
          <NavItem eventKey={ 7 } href="/login">Log In</NavItem>
        </LinkContainer>
      </Nav> }
    </Navbar.Collapse>
  </Navbar>
);

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
};

export default AppNavigation;
