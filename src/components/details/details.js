import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './details.css';
import axios from 'axios';
import Select from 'react-select';
import Menu from '../Menu/Menu';
// import { Container, Row, Col, Button  } from 'bootstrap-4-react';

function Details(props){   
var policestationList = [];
var courtList = [];
var judgeList = [];

    useEffect(() => {
        axios.get('/court/getRegistation')
        .then(function(response) {
          console.log('response ',response.data);
          policestationList = response.data.policestation
          console.log('element ',policestationList);
          courtList = response.data.court;
          judgeList = response.data.judge; 
        }).catch(function (error) {
            console.log('error ',error);
        });    
    },[]);


    console.log('details page');
    const [inputs, setInputs] = useState({
        cctns_no : '',
        fir_no : '',
        cc_rcc_no : '',
        regDate : '',
        regTime : '',
        complaints : '',
        accused : '',
        hearing_date : '',
        pairani : '',
        pp : '',
        io : ''
    });
    
    const [policeStation, setPoliceStation] = useState(null);
    const [court, setCourt] = useState(null);
    const [judge, setJudge] = useState(null);
    const [bailStatus, setBailStatus] = useState(null);
    const [forensic, setForensic] = useState(null);
    const [ps, setPS] = useState(null);
    const [ca_report, setCA] = useState(null);
    const [dna_report, setDNA] = useState(null);
    const [handwriting_report, setHandwritingReport] = useState(null);

    const options = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
        { value: 'Not Available', label: 'Not Available'}
      ];

    const handleInputChange = (e) => {
        // event.persist();
        const {name, value} = e.target
        console.log('e ', e.target.name)
        //  setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
        setInputs({...inputs, [name]: value})
      }

      const submit = () => {
        // setInputs({...inputs, ["policestation"]: policeStation.name});
        // setInputs({...inputs, ["court"]: court.name});
        // setInputs({...inputs, ["judge"]: judge.name});

        // setInputs({...inputs, ["bail"]: bailStatus.value});
        // setInputs({...inputs, ["forensic"]: forensic.value});
        // setInputs({...inputs, ["ca_report"]: ca_report.value});
        // setInputs({...inputs, ["dna_report"]: dna_report.value});
        // setInputs({...inputs, ["handwriting_report"]: handwriting_report.value});
        // setInputs({...inputs, ["judge"]: judge.name});
        

      }

     return (
        <React.Fragment>
            <Menu/>
            <form class="form">
                <div>
                <label class="d-flex">Case Basic Info :</label>
                <div class="row mr5">
                <div class="w-50 pdr-10">
                <label class="col-5">CCTNS No : </label>
                <input class="col-7"type="text" name="cctns_no" value={inputs.cctns_no} onChange={handleInputChange}/>
                </div>
                <div class="w-50">
                <label class="col-5">FIR No : </label>
                <input class="col-7" type="text" name="fir_no" value={inputs.fir_no} onChange={handleInputChange}/>            
                </div>
                </div>

                <div class="row mr5">
                <div class="w-50 pdr-10">
                <label class="col-5">CC/RCC No : </label>
                <input class="col-7" type="text" name="cc_rcc_no" value={inputs.cc_rcc_no} onChange={handleInputChange}/>
                </div>
                <div class="w-50">
                <label class="col-5">Date of Registration : </label>
                <input class="col-7" type="date" name="regDate" value={inputs.regDate} onChange={handleInputChange}/>            
                </div>
                </div>

                <div class="row mr5">
                <div class="w-50 pdr-10">
                <label class="col-5">Time of Registration : </label>
                <input class="col-7" type="date" name="regTime" value={inputs.regTime} onChange={handleInputChange}/>
                </div>
                <div class="w-50 row mr-0">
                <label class="col-5">Police Station :  </label>
                <div class="col-7 pd-0">
                    <Select  name="policeStation" value={policeStation} onChange={e => setPoliceStation(e)} options={policestationList.name}/>
                </div>

                {/* <input class="col-7" type="text" name="policeStation" value={inputs.policeStation} onChange={handleInputChange}/>             */}
                </div>
                </div>

                {/* <div class="row mr5">
                <div class="w-50 pdr-10">
                <label class="col-5">Court :  </label>
                <input class="col-7" type="text" name="court" value={inputs.court} onChange={handleInputChange}/>
                </div>
                <div class="w-50">
                <label class="col-5">Judge :  </label>
                <input class="col-7" type="text" name="judge" value={inputs.judge} onChange={handleInputChange}/>            
                </div>
                </div> */}


                <div class="row mr5">
                <div class="w-50 row mr-0">
                    <label class="col-5">Court :</label>
                    <div class="col-7 pd-0 mrl-5">
                    <Select  name="court" value={court} onChange={e => setCourt(e)} options={options}/>
                    </div>
                </div>

                <div class="w-50 row mr-0">
                    <label class="col-5">Judge :</label>
                    <div class="col-7 pd-0">
                    <Select  name="judge" value={judge} onChange={e => setJudge(e)} options={options}/>
                    </div>
                </div>
                </div>
                </div>

                <div class="row mr5">
                <div class="w-50">
                    <label class="col-5 pdl-0">Complaint</label>
                    <textarea class="col-7 mrl-5" name="complaints" value={inputs.complaints} onChange={handleInputChange} />
                </div>

                <div class="w-50">
                    <label class="col-5">Accused</label>
                    <textarea class="col-7" name="accused" value={inputs.accused} onChange={handleInputChange} />
                </div>
                </div>

                <div class="row mr5">
                <div class="w-50">
                    <label class="col-5 pdl-0">Hearing Date</label>
                    <input type="date" class="col-7 mrl-5" name="hearing_date" value={inputs.hearing_date} onChange={handleInputChange}/>
                </div>

                <div class="w-50 row mr-0">
                    <label class="col-5">Bail Status</label>
                    <div class="col-7 pd-0">
                    <Select  name="bailStatus" value={bailStatus} onChange={e => setBailStatus(e)} options={options}/>
                    </div>
                </div>
                </div>

                <div>
                <label class="d-flex">Muddemaal :</label>
                <div class="row mr5">
                <div class="w-50 row mr-0">
                    <label class="col-5">Forensic</label>
                    <div class="col-7 pd-0 mrl-5">
                    <Select  name="forensic" value={forensic} onChange={e => setForensic(e)} options={options}/>
                    </div>
                </div>

                <div class="w-50 row mr-0">
                    <label class="col-5">PS</label>
                    <div class="col-7 pd-0">
                    <Select  name="ps" value={ps} onChange={e => setPS(e)} options={options}/>
                    </div>
                </div>
                </div>
                </div>

                <div>
                <label class="d-flex">Forensic Reports :</label>
                <div class="row mr5">
                <div class="w-50 row mr-0">
                    <label class="col-5">CA Report</label>
                    <div class="col-7 pd-0 mrl-5">
                    <Select  name="ca_report" value={ca_report} onChange={e => setCA(e)} options={options}/>
                    </div>
                </div>

                <div class="w-50 row mr-0">
                    <label class="col-5">DNA Report</label>
                    <div class="col-7 pd-0">
                    <Select  name="dna_report" value={dna_report} onChange={e => setDNA(e)} options={options}/>
                    </div>
                </div>
                </div>

                <div class="row mr5">
                <div class="w-50 row mr-0">
                    <label class="col-5">Handwriting Report</label>
                    <div class="col-7 pd-0 mrl-5">
                    <Select  name="handwriting_report" value={handwriting_report} onChange={e => setHandwritingReport(e)} options={options}/>
                    </div>
                </div>
                </div>
                </div>

                <div>
                <label class="d-flex">Manpower :</label>
                <div class="row mr5">
                <div class="w-50 pdr-10">
                <label class="col-5">Pairani Name : </label>
                <input class="col-7"type="text" name="pairani" value={inputs.pairani} onChange={handleInputChange}/>
                </div>
                <div class="w-50">
                <label class="col-5">PP Name : </label>
                <input class="col-7" type="text" name="pp" value={inputs.pp} onChange={handleInputChange}/>            
                </div>
                </div>

                <div class="row mr5">
                <div class="w-50 pdr-10">
                <label class="col-5">IO Name : </label>
                <input class="col-7"type="text" name="io" value={inputs.io} onChange={handleInputChange}/>
                </div>
                </div>

                </div>

                <div class="d-flex justify-content-center mt-3 login_container">
					<button type="button" class="btn login_btn" onClick={() => { submit() }}>Submit</button>
				</div>
            </form>
        </React.Fragment>
     );
   }
    
export default Details;