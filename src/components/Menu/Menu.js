import React, {Component} from 'react';
import './Menu.css';
import {Link} from 'react-router-dom';
import { Navbar, Button, Collapse } from 'bootstrap-4-react';

class Menu extends Component{

    render(){

        const navbars = {
            textDecoration: 'none',
            color: 'darkgray',
            marginLeft: '20px',
        }

        const navbars1 = {
            textDecoration: 'none',
            color: 'darkgray',
            marginRight: '1050px',
        }

        return(
            <div>
                <React.Fragment>
                    <Navbar expand="lg" dark bg="dark" mb="3">
                    {/* <Navbar.Brand href="#">Welcome to the dashboard {this.props.name} !</Navbar.Brand> */}
                    <Navbar.Toggler target="#navbarColor1" />
                    <Collapse navbar id="navbarColor1">
                        <Navbar.Nav mr="auto">
                            <Link style={navbars}  to="/dashboard">Dashboard</Link>
                        </Navbar.Nav>

                        <Navbar.Nav mr="auto">
                            <Link style={navbars1}  to="/details">Add Details</Link>
                        </Navbar.Nav>
                        <Button onClick={this.props.logout} outline info my="2 sm-0">Logout</Button>
                    </Collapse>
                    </Navbar>
                </React.Fragment>
            </div>
        )
    }

}
export default Menu;