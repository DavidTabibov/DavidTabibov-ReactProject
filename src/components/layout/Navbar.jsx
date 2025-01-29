import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Form,
  InputGroup,
  NavDropdown,
  Badge,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faMoon,
  faSearch,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';

const UserBadge = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  let variant = 'secondary';
  let text = 'Regular';

  if (user.isAdmin) {
    variant = 'danger';
    text = 'Admin';
  } else if (user.isBusiness) {
    variant = 'success';
    text = 'Business';
  }

  return (
    <Badge bg={variant} className="ms-2">
      {text}
    </Badge>
  );
};

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-dark');
      document.body.classList.add('text-light');
    } else {
      document.body.classList.remove('bg-dark');
      document.body.classList.remove('text-light');
    }
  }, [darkMode]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
    }
  };

  const handleDarkModeToggle = () => {
    toggleDarkMode();
  };

  const handleLogout = () => {
    dispatch({ type: 'auth/logout' }); // Dispatch logout as an action type
    navigate('/'); // Redirect to home page
  };

  const getNavLinks = () => {
    const links = [{ to: '/about', text: 'About' }];

    if (user) {
      links.push({ to: '/favorites', text: 'Fav Cards' });

      if (user.isBusiness) {
        links.push({ to: '/my-cards', text: 'My Cards' });
      }

      if (user.isAdmin) {
        if (!links.some((link) => link.to === '/my-cards')) {
          links.push({ to: '/my-cards', text: 'My Cards' });
        }
        links.push({ to: '/sandbox', text: 'Sandbox' });
      }
    }

    return links;
  };

  return (
    <BootstrapNavbar
      bg={darkMode ? 'dark' : 'primary'}
      variant="dark"
      expand="lg"
      fixed="top"
      className="shadow-sm"
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold">
          BCard
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {getNavLinks().map((link, index) => (
              <Nav.Link key={index} as={Link} to={link.to} className="px-3">
                {link.text}
              </Nav.Link>
            ))}
          </Nav>

          <Form className="d-flex mx-3" onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`border-0 rounded-start ${darkMode ? 'bg-dark text-light' : 'bg-light'
                  }`}
              />
              {searchQuery && (
                <InputGroup.Text
                  onClick={() => setSearchQuery('')}
                  className="border-0 bg-transparent text-light"
                  style={{ cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </InputGroup.Text>
              )}
              <InputGroup.Text
                onClick={handleSearch}
                className="border-0 bg-transparent text-light"
                style={{ cursor: 'pointer' }}
              >
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
            </InputGroup>
          </Form>
          <Nav>
            <Nav.Link onClick={handleDarkModeToggle} className="px-3">
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </Nav.Link>
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login" className="px-3">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="px-3">
                  Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <NavDropdown
                  title={
                    <span>
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      {`${user.name?.first || ''} ${user.name?.last || ''}`}
                    </span>
                  }
                  id="basic-nav-dropdown"
                  align="end"
                  className="px-3"
                >
                  <NavDropdown.Item as={Link} to="/profile/edit">
                    Edit Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                <UserBadge />
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
