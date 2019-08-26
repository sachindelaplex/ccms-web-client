import React, {Component} from 'react';
import './Dashboard.css';
import 'antd/dist/antd.css';
import Menu from '../Menu/Menu';
import { Container, Row, Col, Button  } from 'bootstrap-4-react';
import 'tachyons';
import axios from 'axios';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import * as moment from 'moment';


class Dashboard extends Component{

    constructor(){
        super();
        this.state = {
            cctns_no : '',
            //date : '',
            courtArray: [],
            monthArray:[],
            currentMonth: '',
            yearArray:[],
            currentYear: '',
            psArray: [],
            year: '',
            month: '',
            police_id : ''
        }
        //this.getAllList();
        this.getPoliceStationList();

    }

    componentWillMount(){
          //Get months list
          let months = [];
          let theMonths = ["January", "February", "March", "April", "May",
              "June", "July", "August", "September", "October", "November", "December"];
          for (var i=0; i<12; i++) {
              months[i] = {
                  value : i+1,
                  name : theMonths[i]
              }
          }
          let currMonthName  = moment().format('MMMM');
          let monthNum = moment().month(currMonthName).format("M");
          this.state.monthArray = months;
          this.state.currentMonth = monthNum;
          this.state.month = monthNum;
  
          //Get years list
          let years = [];
          let currYearName  = moment().format('YYYY');
          for(var y = 2000; y <= 2025; y++) {
             years[y] = y;
          }
          this.state.yearArray = years;
          this.state.currentYear = currYearName;
          this.state.year = currYearName;
    }

    getPoliceStationList = () =>{
        axios.get('/court/getAllPoliceStation', {
            "headers": {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
          })
        .then((response) =>{
            this.setState({psArray: response.data});
        })
        .catch((err) =>{
            if(err){
                this.props.history.push('/');
            }
        });
    }
   
    // logout = ()=>{
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('id');
    //     this.props.history.push('/');
    // }

    handleForm = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    searchClick = (event)=>{

        let monthVal;
        let yearVal;
        if(this.state.month == '' || this.state.month == undefined){
            monthVal = this.state.currentMonth
        } else {
            monthVal = this.state.currentMonth
        }

        if(this.state.year == '' || this.state.year == undefined){
            yearVal = this.state.currentYear
        } else {
            yearVal = this.state.currentYear
        }
        

        let hearing_date = yearVal+'-'+monthVal;

        const postData = {
            cctns_no : this.state.cctns_no,
            policestation : this.state.police_id,
            hearing_date : hearing_date
        }

        axios.post('/court/filter',postData,{
            "headers": {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        .then((response) =>{
            this.setState({courtArray: response.data});
        })
        .catch((err) =>{
            this.props.history.push('/')
        })
    }

    

    changedate = (date) => {
        if(date !== '' && date !== null){
            let newdate = moment(date, 'YYYY-MM-DD').format();
            let latestDate = newdate.split("T");
            return latestDate[0];
        }
    }

    changeMonth = (value) =>{
        this.setState({currentMonth : value})
    }

    changeYear = (value) =>{
        this.setState({currentYear : value})
    }

    changePS = (value) =>{
        this.setState({police_id : value})
    }

    refesh = (e) =>{
        
        this.setState({
            courtArray : [],
            currentYear: this.state.year,
            currentMonth: this.state.month,
            cctns_no: "",
            police_id: "",
        });
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
                    <div className="cellDiv">{this.changedate(courtarray[i].date_of_registration)}</div>
                    <div className="cellDiv">
                        <Link  to={`/view/${courtarray[i]._id}`}>View</Link> |  <Link  to={`/details/${courtarray[i]._id}`}>Edit</Link>
                    </div>
                </div>
            )
        });


        //Month list data
        const montharray = this.state.monthArray;
        const mListArray = montharray.map((court, i)=>{
            return (
                <option key={i} value={montharray[i].value}>{montharray[i].name}</option>
            )
        });

        //year list data
        const yeararray = this.state.yearArray;
        const yListArray = yeararray.map((court, i)=>{
            return (
                <option key={i} value={yeararray[i]}>{yeararray[i]}</option>
            )
        });

        //police station list data
        const psarray = this.state.psArray;
        const psListArray = psarray.map((court, i)=>{
            return (
                <option key={i} value={psarray[i]._id}>{psarray[i].name}</option>
            )
        });


        return(
            <div>
                  <Menu/>
                    <Container>
                        <br/>
                        <Row alignItems="start">
                            
                            <Col>
                                <select  value={this.state.currentMonth}  onChange={(e) => this.changeMonth(e.target.value) }   className="form-control input_user">
                                <option value="">Select Month</option>
                                        {mListArray}
                                </select>
                            </Col>
                            <Col>
                                <select  value={this.state.currentYear}  onChange={(e) => this.changeYear(e.target.value) }   className="form-control input_user">
                                <option value="">Select Month</option>
                                   {yListArray}
                                </select>
                            </Col>
                            <Col>
                                <select value={this.state.police_id} onChange={(e) => this.changePS(e.target.value) } className="form-control input_user">
                                    <option value="">Select Police Station</option>
                                    {psListArray}
                                </select>
                            </Col>
                            <Col>
                                <input type="text" value={this.state.cctns_no} onChange={this.handleForm} className="form-control input_user" name="cctns_no"  placeholder="CCTNS No"/>
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
                                {courtListArray.length == 0 ? null  : 
                                    <div   className="containerDiv">
                                        <div className="rowDivHeader">
                                            <div className="cellDivHeader">CCTNS NO</div>
                                            <div className="cellDivHeader">FIR NO</div>
                                            <div className="cellDivHeader">Registration Date</div>
                                            <div className="cellDivHeader">Action</div>
                                        </div>
                                        {courtListArray}
                                    </div> 
                                }
                                
                            </Col>
                        </Row>
                        
                    </Container>
            </div>
        )
    }

}
export default Dashboard;