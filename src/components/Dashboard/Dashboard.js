import React, {Component} from 'react';
import './Dashboard.css';
import 'antd/dist/antd.css';
import Menu from '../Menu/Menu';
import { Container, Row, Col, Button  } from 'bootstrap-4-react';
import 'tachyons';
import axios from 'axios';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { DatePicker } from 'antd';


class Dashboard extends Component{

    constructor(){
        super();
        this.state = {
            username : '',
            cctns_no : '',
            date : '',
            courtArray: [],
        }
        this.getAllList();
    }

    
    getAllList = () =>{
        axios.get('/court/getAll', {
            "headers": {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
          })
        .then((response) =>{
            this.setState({courtArray: response.data});
        })
        .catch((err) =>{
            if(err){
                this.props.history.push('/');
            }
        });
    }
   

    // userList = () =>{
    //     axios.get('userlist')
    //     .then((response) =>{
    //         //console.log(response)
    //         this.setState({userArray: response.data});
    //     })
    //     .catch((err) =>{
    //         console.log(err)
    //     });
    // }

    logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        this.props.history.push('/');
    }

    changeDatepickerValue = (date, dateString) =>  {
        console.log(dateString);
    }

    render(){
        const rowStyle2 = {
            height: 'auto',
            backgroundColor: '#fff',
            marginTop: '1rem',
        };

        const imageStyle = {
            height: '150px',
            width: '170px',
        }

       
        //Court List Data
        const courtarray = this.state.courtArray;
        const courtListArray = courtarray.map((court, i)=>{
            return (
                <div key={i} className="rowDiv">
                    <div className="cellDiv">{courtarray[i].cctns_no}</div>
                    <div className="cellDiv">{courtarray[i].fir_no}</div>
                    <div className="cellDiv">{courtarray[i].date_of_registration}</div>
                    <div className="cellDiv">
                        <Link  to={`/editDetail/${courtarray[i]._id}`}>View</Link> |  <Link  to={`/editDetail/${courtarray[i]._id}`}>Edit</Link>
                    </div>
                </div>
            )
        });

        
        return(
            <div>
                  <Menu name={this.state.username} logout={this.logout}/>
                    <Container>
                        <br/>
                        <div><h3></h3></div>
                        <Row alignItems="start">
                            
                            <Col></Col>
                            <Col>
                                <input type="text" className="form-control input_user" name="cctns"  placeholder="CCTNS No"/>
                            </Col>
                            <Col>
                                <DatePicker onChange={this.changeDatepickerValue} />
                            </Col>
                            <Col>
                                <Button primary as="input" type="submit" value="Search" />
                            </Col>
                            <Col></Col>
                        </Row>
                        <br/>
                        <br/>
                        <div><h3></h3></div>

                        <Row style={rowStyle2} alignItems="start">
                            <Col >
                            <div className="containerDiv">

                                    <div className="rowDivHeader">
                                        <div className="cellDivHeader">CCTNS NO</div>
                                        <div className="cellDivHeader">FIR NO</div>
                                        <div className="cellDivHeader">Registration Date</div>
                                        <div className="cellDivHeader">Action</div>
                                    </div>
                                    {courtListArray}
                             </div>
                            </Col>
                        </Row>

                    </Container>
            </div>
        )
    }

}
export default Dashboard;