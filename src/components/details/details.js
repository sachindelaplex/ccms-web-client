import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './details.css';
import axios from 'axios';
import Select from 'react-select';
import Menu from '../Menu/Menu';
import { DatePicker } from 'antd';
import { TimePicker } from 'antd';
import { Container, Row, Col, Button  } from 'bootstrap-4-react';

function Details(props){   
    const [policestationList, setPolicestationList] = useState([]);
    const [courtList, setCourtList] = useState([]);
    const [judgeList, setJudgeList] = useState([]);
    const [date_of_registration, setDate_of_registration] = useState('');
    const [time_of_registration, setTime_of_registration] = useState('');
    const [hearing_date, setHearing_date] = useState('');

    const [date_of_evidence, setDate_of_evidence] = useState('');
    const [date_of_statement, setDate_of_statement] = useState('');
    const [date_of_argument, setDate_of_argument] = useState('');
    const [date_of_judgement, setDate_of_judgement] = useState('');

    const rowStyle = {
        height: '500px',
        backgroundColor: '#fff',
        marginTop: '1rem',
        border:'2px solid darkgrey',
        position:'relative'
        };

    useEffect(() => {       
        axios.get('/court/getRegistation', {
            "headers": {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
          })
        .then(function(response) {
          console.log('response ',response.data);
          setPolicestationList(response.data.policestation)         
          setCourtList(response.data.court);
          setJudgeList(response.data.judge); 
        }).catch(function (error) {
            console.log('error ',error);
        });    
    },[]);


    // console.log('details page');
    const [inputs, setInputs] = useState({
        cctns_no : '',
        fir_no : '',
        cc_rcc_no : '',
        date_of_registration : '',
        time_of_registration : '',
        complaints : '',
        accused : '',
        hearing_date : '',
        bail : '',
        custody : '',
        forensic : '',
        ca_report : '',
        dna_report : '',
        handwriting_report : '',
        pairani : '',
        pp : '',
        io : '',
        bail_custody_status : '',
        witness : 'Police',
        panch : 'Other Panch',
        policestation : '',
        court : '' ,
        judge : ''
    });
    

    const [actionInputs, setActioninputs] = useState({
        witness : '',
        io : '',
        punch : '',
        evidenceStatus : '',
        statementRemark : '',
        statementStatus : '',
        argumentRemark : '',
        argumentStatus : '',
        judgementRemark : '',
        judgementStatus : ''
    });

    const [ps, setPS] = useState(null);
 
    const options = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
        { value: 'Not Available', label: 'Not Available'}
      ];

    const handleInputChange = (e) => {
        // event.persist();
        const {name, value} = e.target       
        setInputs({...inputs, [name]: value})
      }

      const handleActionChange = (e) => {       
        const {name, value} = e.target       
        setActioninputs({...inputs, [name]: value})
      }
      

      const reset = () => {
        setInputs({
            cctns_no : '',
            fir_no : '',
            cc_rcc_no : '',
            date_of_registration : '',
            time_of_registration : '',
            complaints : '',
            accused : '',
            hearing_date : '',
            bail : '',
            custody : '',
            forensic : '',
            ca_report : '',
            dna_report : '',
            handwriting_report : '',
            pairani : '',
            pp : '',
            io : '',
            bail_custody_status : '',
            witness : '',
            panch : '',
            policestation : '',
            court : '' ,
            judge : '',
            case_action_states : {}
        })
      }

      const submit = (e) => { 
        e.preventDefault();
        inputs.date_of_registration = date_of_registration;
        inputs.time_of_registration = time_of_registration;
        inputs.hearing_date = hearing_date;       
        

        var gridData = {
            evidence : {
                date : date_of_evidence,
                witness : actionInputs.witness,
                io : actionInputs.io,
                punch : actionInputs.punch,
                status : actionInputs.evidenceStatus
            },
            statement : {
                date : date_of_statement,
                remark : actionInputs.statementRemark,
                status : actionInputs.statementStatus
            },
            argument : {
                date : date_of_argument,
                remark : actionInputs.argumentRemark,
                status : actionInputs.argumentStatus
            },
            judgement : {
                date : date_of_judgement,
                remark : actionInputs.judgementRemark,
                status : actionInputs.judgementStatus
            }
        }

        inputs.case_action_states = gridData;
        
        console.log('now inputs are .....',inputs);
        axios.post('/court/save',inputs )
		.then(function(response) {
            console.log('response ', response);
            props.history.push('/dashboard');
        }).catch(function (error) {
            console.log('error ',error);
        });     
      }

      const changeDatepickerValue = () => {

      }



     return (
        <React.Fragment>
            <div class="col-md-11 col-sm-10">
					<div class=" login-field page-title">
						<h1>Details</h1>
			        </div>          
					<div id="login-row" class="col-md-12">
							<div id="login-column">
								<div class="login-box">
									<form id="login-form" class="form" onSubmit={(e) => submit(e)}>
                                        <label class="group-label">Case Basic Info</label>
                                        <div class="row">                                        
											<div class="col-md-4">
												<div class="form-group login-field">
													<label>CCTNS No</label><br/>
													<input type="text" class="form-control" name="cctns_no" value={inputs.cctns_no} onChange={handleInputChange} required/>
													{/* <div class="validation-msg">Please enter Valid Name</div> */}
												</div>
											</div>
											<div class="col-md-4">
												<div class="form-group login-field">
													<label>FIR No</label><br/>
													<input type="text" class="form-control" name="fir_no" value={inputs.fir_no} onChange={handleInputChange} required/>
													{/* <div class="validation-msg"></div> */}
												</div>
											</div>
											<div class="col-md-4">
												<div class="form-group login-field">
													<label>CC/RCC No</label><br/>
													<input type="text" class="form-control" name="cc_rcc_no" value={inputs.cc_rcc_no} onChange={handleInputChange} required/>
													{/* <div class="validation-msg"></div> */}
												</div>
											</div>
											<div class="col-md-4">
												<div class="form-group login-field">
													<label>Date of Registration</label><br/>                    
													<DatePicker name="date_of_registration" onChange={(date, dateString) => {setDate_of_registration(dateString)}} required/> 
                                                    {/* <input type="text" name="" id="" class="form-control"/> */}
													<div class="validation-msg"></div>
												</div>
											</div>
											<div class="col-md-4">
												<div class="form-group login-field">
													<label>Time of Registration</label><br/>
													<TimePicker name="time_of_registration" onChange={(date, timeString) => {setTime_of_registration(timeString)}} required/>
                                                    {/* <input type="text" name="" id="" class="form-control"/>
													<div class="validation-msg"></div> */}
												</div>
											</div>
											<div class="col-md-4">
												<div class="form-group login-field">
													<label>Police Station</label><br/>
                                                    <select class="custom-select" name="policestation" value={inputs.policestation} onChange={handleInputChange} required>
                                                    <option  value="">Select Police Station</option>
                                                    {policestationList.map( (item, i) => (
                                                    <option key={i} value={item._id}>{item.name}</option>
                                                    ) )}
                                                    </select>
													{/* <input type="text" name="" id="" class="form-control"/>
													<div class="validation-msg"></div> */}
												</div>
											</div>
											<div class="col-md-4">
												<div class="form-group login-field">
													<label>Court</label><br/>
                                                    <select class="custom-select" name="court" value={inputs.court} onChange={handleInputChange} required>
                                                    <option  value="">Select Court</option>
                                                    {courtList.map( (item, i) => (
                                                    <option key={i} value={item._id}>{item.name}</option>
                                                    ) )}
                                                    </select>
													{/* <div class="validation-msg"></div> */}
												</div>
											</div>
											<div class="col-md-4">
												<div class="form-group login-field">
													<label>Judge</label><br/>
                                                    <select class="custom-select" name="judge" value={inputs.judge} onChange={handleInputChange} required>
                                                    <option  value="">Select Judge</option>
                                                    {judgeList.map( (item, i) => (
                                                    <option key={i} value={item._id}>{item.name}</option>
                                                    ) )}
                                                    </select>
													{/* <div class="validation-msg"></div> */}
												</div>
											</div>
                                            <div class="col-md-4">
												<div class="form-group login-field">
													<label>Hearing Date</label><br/>
                                                    <DatePicker name="hearing_date" onChange={(date, dateString) => {setHearing_date(dateString)}} required/>
													{/* <div class="validation-msg"></div> */}
												</div>
											</div>
										</div>
										<br/>
                                        <label class="group-label">Complaint</label>
                                        <div class="row">                                       
											<div class="col-md-12">
												<div class="form-group login-field">
													{/* <label>Complaint</label><br/> */}
                                                    <textarea class="form-control" name="complaints" value={inputs.complaints} onChange={handleInputChange} required/>													
													{/* <div class="validation-msg">Please enter Valid Name</div> */}
												</div>
											</div>											
										</div>
                                        <br/>
                                        <label class="group-label">Accused</label>
                                        <div class="row">                                       
											<div class="col-md-12">
												<div class="form-group login-field">
													{/* <label>Accused</label><br/> */}
                                                    <textarea class="form-control" name="accused" value={inputs.accused} onChange={handleInputChange} required/>			{/* <div class="validation-msg">Please enter Valid Name</div> */}
												</div>
											</div>											
										</div>
                                        <br/>
                                        <label class="group-label">Bail/Custody</label>
                                        <div class="row">                                       
											<div class="col-md-4">
												<div class="form-group login-field">
													<label>Bail</label><br/>
                                                    <select class="custom-select" name="bail" value={inputs.bail} onChange={handleInputChange} required>
                                                    <option  value="">Select Bail Status</option>
                                                    <option  value="Bailable Warrant">Bailable Warrant</option>
                                                    <option  value="Non Bailable Warrant">Non Bailable Warrant</option>
                                                    </select>
												</div>
											</div>	
                                            <div class="col-md-4">
												<div class="form-group login-field">
													<label>Custody</label><br/>
                                                    <select class="custom-select" name="custody" value={inputs.custody} onChange={handleInputChange} required>
                                                    <option  value="">Select Custody Status</option>
                                                    {options.map( (item, i) => (
                                                    <option key={i} value={item.value}>{item.label}</option>
                                                    ) )}
                                                    </select>
												</div>
											</div>		
                                            <div class="col-md-4">
												<div class="form-group login-field">
													<label>Bail/Custody Status</label><br/>
                                                    <select class="custom-select" name="bail_custody_status" value={inputs.bail_custody_status} onChange={handleInputChange} required>
                                                    <option  value="">Select Bail/Custody Status</option>
                                                    <option  value="On Bail">On Bail</option>
                                                    <option  value="Bond Condition">Bond Condition</option>
                                                    </select>
												</div>
											</div>												
										</div>




                                        <br/>
                                        <label class="group-label">Muddemaal</label>
                                        <div class="row">                                       
											<div class="col-md-4">
												<div class="form-group login-field">
													<label>Forensic</label><br/>
                                                    <select class="custom-select" name="forensic" value={inputs.forensic} onChange={handleInputChange} required>
                                                    <option  value="">Select Forensic Report Status</option>
                                                    {options.map( (item, i) => (
                                                    <option key={i} value={item.value}>{item.label}</option>
                                                    ) )}
                                                    </select>
												</div>
											</div>	
                                            <div class="col-md-4">
												<div class="form-group login-field">
													<label>PS</label><br/>
                                                    <Select  name="ps" value={ps} onChange={e => setPS(e)} options={options}/>
												</div>
											</div>												
										</div>
                                        <br/>
                                        <label class="group-label">Forensic Reports</label>
                                        <div class="row">                                       
											<div class="col-md-4">
												<div class="form-group login-field">
													<label>CA Report</label><br/>
                                                    <select class="custom-select" name="ca_report" value={inputs.ca_report} onChange={handleInputChange} required>
                                                    <option value="">Select CA Report Status</option>
                                                    {options.map( (item, i) => (
                                                    <option key={i} value={item.value}>{item.label}</option>
                                                    ) )}
                                                    </select> 
												</div>
											</div>	
                                            <div class="col-md-4">
												<div class="form-group login-field">
													<label>DNA Report</label><br/>
                                                    <select class="custom-select" name="dna_report" value={inputs.dna_report} onChange={handleInputChange} required>
                                                    <option  value="">Select DNA Report Status</option>
                                                    {options.map( (item, i) => (
                                                    <option key={i} value={item.value}>{item.label}</option>
                                                    ) )}
                                                    </select> 
												</div>
											</div>		
                                            <div class="col-md-4">
												<div class="form-group login-field">
													<label>Handwriting Report</label><br/>
                                                    <select class="custom-select" name="handwriting_report" value={inputs.handwriting_report} onChange={handleInputChange} required>
                                                    <option  value="">Select Handwriting Report Status</option>
                                                    {options.map( (item, i) => (
                                                    <option key={i} value={item.value}>{item.label}</option>
                                                    ) )}
                                                    </select>
												</div>
											</div>												
										</div>
                                        <br/>
                                        <label class="group-label">Manpower</label>
                                        <div class="row">                                        
											<div class="col-md-4">
												<div class="form-group login-field">
													<label>Pairani Name</label><br/>
													<input type="text" class="form-control" name="pairani" value={inputs.pairani} onChange={handleInputChange} required/>
												</div>
											</div>
											<div class="col-md-4">
												<div class="form-group login-field">
													<label>PP Name</label><br/>
													<input type="text" class="form-control" name="pp" value={inputs.pp} onChange={handleInputChange} required/>
													{/* <div class="validation-msg"></div> */}
												</div>
											</div>
											<div class="col-md-4">
												<div class="form-group login-field">
													<label>IO Name</label><br/>
													<input type="text" class="form-control" name="io" value={inputs.io} onChange={handleInputChange} required/>
													{/* <div class="validation-msg"></div> */}
												</div>
											</div>
                                        </div>
                                        <br/>
                                    

                                        {/* <br/>
                                        <label class="group-label">Case Action Dates</label>
                                        <div class="row">                                        
											<div class="col-md-3">
												<label>Date</label><br/>
											</div>
                                            <div class="col-md-3">
												<label>Type of Action</label><br/>
											</div>
                                            <div class="col-md-3">
												<label>Remark</label><br/>
											</div>
                                            <div class="col-md-3">
												<label>Status</label><br/>
											</div>
                                        </div>
                                        <div class="row">                                        
											<div class="col-md-4">
												<div class="form-group login-field">
													<label>Pairani Name</label><br/>
													<input type="text" class="form-control" name="pairani" value={inputs.pairani} onChange={handleInputChange} required/>
												</div>
											</div>
                                        </div>
                                        <br/> */}











                                        <Row>
<div><h5><b>Case Action Dates</b></h5></div>
</Row>
<Row style={rowStyle} alignItems="start">
<Col>
<div><h5><b>Date</b></h5></div>
<br></br>
<div><DatePicker name="date_of_evidence" onChange={(date, dateString) => {setDate_of_evidence(dateString)}} required/> </div>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<div><DatePicker name="date_of_statement" onChange={(date, dateString) => {setDate_of_statement(dateString)}} required/></div>
<br></br>
<br></br>
<br></br>
<div><DatePicker name="date_of_argument" onChange={(date, dateString) => {setDate_of_argument(dateString)}} required/></div>
<br></br>
<br></br>
<br></br>
<div><DatePicker name="date_of_judgement" onChange={(date, dateString) => {setDate_of_judgement(dateString)}} required/></div>
</Col>
<Col>
<div><h5><b>Type Of Action</b></h5></div>
<br></br>
<div><h5>Evidence</h5></div>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<div><h5>Statement</h5></div>
<br></br>
<br></br>
<br></br>
<div><h5>Argument</h5></div>
<br></br>
<br></br>
<br></br>
<div><h5>Judegement</h5></div>
</Col>
<Col>
<div><h5><b></b></h5></div>
<br></br>
<div>
<span>Witness</span>
<select className="form-control input_user" name="witness" value={actionInputs.witness} onChange={handleActionChange} required>
<option value="">Select Witness</option>
<option value="Public">Public</option>
<option value="Police">Police</option>
</select>
</div>
<div>
<span>IO</span>
<select className="form-control input_user" name="io" value={actionInputs.io} onChange={handleActionChange} required>
<option value="">Select IO</option>
<option value="Yes">Yes</option>
<option value="No">No</option>
<option value="NA">NA</option>
</select>
</div>
<div>
<span>Punch</span>
<select className="form-control input_user" name="punch" value={actionInputs.punch} onChange={handleActionChange} required>
<option value="">Select Punch</option>
<option value="Seizure Panch">Seizure Panch</option>
<option value="Other Panch">Other Panch</option>
</select>
</div>
<br></br>
<textarea class="form-control input_user" name="statementRemark" value={actionInputs.statementRemark} onChange={handleActionChange} required/>
<br></br>
<textarea class="form-control input_user" name="argumentRemark" value={actionInputs.argumentRemark} onChange={handleActionChange} required/>
<br></br>
<textarea class="form-control input_user" name="judgementRemark" value={actionInputs.judgementRemark} onChange={handleActionChange} required/>
</Col>
<Col>
<div><h5><b>Status</b></h5></div>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<div>
<select className="form-control input_user" name="evidenceStatus" value={actionInputs.evidenceStatus} onChange={handleActionChange} required>
<option value="Pending">Pending</option>
<option value="Completed">Completed</option>
<option value="In-Progress">In-Progress</option>
<option value="NA">NA</option>
</select>
</div>
<br></br>
<br></br>
<br></br>
<div>
<select className="form-control input_user" name="statementStatus" value={actionInputs.statementStatus} onChange={handleActionChange} required>
<option value="Pending">Pending</option>
<option value="Completed">Completed</option>
<option value="In-Progress">In-Progress</option>
<option value="NA">NA</option>
</select>
</div>
<br></br>
<br></br>
<div>
<select className="form-control input_user" name="argumentStatus" value={actionInputs.argumentStatus} onChange={handleActionChange} required>
<option value="Pending">Pending</option>
<option value="Completed">Completed</option>
<option value="In-Progress">In-Progress</option>
<option value="NA">NA</option>
</select>
</div>
<br></br>
<br></br>
<div>
<select className="form-control input_user" name="judgementStatus" value={actionInputs.judgementStatus} onChange={handleActionChange} required>
<option value="Pending">Pending</option>
<option value="Completed">Completed</option>
<option value="In-Progress">In-Progress</option>
<option value="NA">NA</option>
</select>
</div>

</Col>
</Row>

























										<div class="row">
											<div class="col-md-6 txtRight">
												<div class="form-group login-field">
                                                <input type="submit" name="submit" class="btn btn-info btn-md btnwd" value="Submit"/>
                                                {/* <button type="button" class="btn btn-info btn-md" onClick={() => { submit() }}>Submit</button> */}
												</div>
											</div>
											<div class="col-md-6">
												<div class="form-group login-field">
                                                <button type="button" class="btn btn-info btn-md btnwd" onClick={() => { reset() }}>Reset</button>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				
        </React.Fragment>
     );
   }
    
export default Details;