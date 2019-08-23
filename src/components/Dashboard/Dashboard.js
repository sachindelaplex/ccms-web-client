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
import * as moment from 'moment';


class Dashboard extends Component{

    constructor(){
        super();
        this.state = {
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
 
    logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        this.props.history.push('/');
    }

    changeDatepickerValue = (date, dateString) =>  {
        this.setState({
            date : dateString
        })
    }

    handleForm = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    searchClick = (event)=>{
        const postData = {
            cctns_no : this.state.cctns_no,
            created : this.state.date
        }
        axios.post('/court/filter',postData,{
            "headers": {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        .then((response) =>{
            //console.log(response)
            this.setState({courtArray: response.data});
            this.setState({cctns_no : ""})
        })
        .catch((err) =>{
            this.props.history.push('/')
        })
    }

    refesh = (e) =>{
        this.getAllList();
    }

    chengedate = (date) => {
        if(date !== '' && date !== null){
            let newdate = moment(date, 'YYYY-MM-DD').format();
            let latestDate = newdate.split("T");
            return latestDate[0];
        }
    }

    render(){
        const rowStyle2 = {
            height: 'auto',
            backgroundColor: '#fff',
            marginTop: '1rem',
        };

        //Court List Data
        const courtarray = this.state.courtArray;
        const courtListArray = courtarray.map((court, i)=>{
            return (
                <div key={i} className="rowDiv">
                    <div className="cellDiv">{courtarray[i].cctns_no}</div>
                    <div className="cellDiv">{courtarray[i].fir_no}</div>
                    <div className="cellDiv">{this.chengedate(courtarray[i].date_of_registration)}</div>
                    <div className="cellDiv">
                        <Link  to={`/view/${courtarray[i]._id}`}>View</Link> |  <Link  to={`/details/${courtarray[i]._id}`}>Edit</Link>
                    </div>
                </div>
            )
        });

        return(
            <div>
                  <Menu logout={this.logout}/>
                    <Container>
                        <br/>
                        <Row alignItems="start">
                            
                            <Col></Col>
                            <Col>
                                <input type="text" value={this.cctns_no} onChange={this.handleForm} className="form-control input_user" name="cctns_no"  placeholder="CCTNS No"/>
                            </Col>
                            <Col>
                                <DatePicker onChange={this.changeDatepickerValue} />
                            </Col>
                            <Col>
                                <Button primary as="input" onClick={e => this.searchClick(e)} type="submit" value="Search" />
                                <span> <Button primary as="input" onClick={e => this.refesh(e)} type="submit" value="Refresh" /></span>
                            </Col>
                            <Col></Col>
                        </Row>
                        <br/>
                        <br/>
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