import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './details.css';
import axios from 'axios';
import Select from 'react-select';

function Details(props){   

    useEffect(() => {
        axios.get('/court/getRegistation')
        .then(function(response) {
          console.log('response ',response.data);
            
        }).catch(function (error) {
            console.log('error ',error);
        });    
    },[]);


    console.log('details page');
    const [inputs, setInputs] = useState({
        CCTNS : '',
        FIR : '',
        RCC : '',
        regDate : '',
        regTime : '',
        complaint : '',
        accused : '',
        hearingDate : '',
        pairaniName : '',
        ppName : '',
        ioName : ''
    });
    
    const [policeStation, setPoliceStation] = useState(null);
    const [court, setCourt] = useState(null);
    const [judge, setJudge] = useState(null);
    const [bailStatus, setBailStatus] = useState(null);
    const [forensic, setForensic] = useState(null);
    const [ps, setPS] = useState(null);
    const [ca, setCA] = useState(null);
    const [dna, setDNA] = useState(null);
    const [handwritingReport, setHandwritingReport] = useState(null);

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

     return (
        <React.Fragment>
            <form class="form">
                <div>
                <label class="d-flex">Case Basic Info :</label>
                <div class="row mr5">
                <div class="w-50 pdr-10">
                <label class="col-5">CCTNS No : </label>
                <input class="col-7"type="text" name="CCTNS" value={inputs.CCTNS} onChange={handleInputChange}/>
                </div>
                <div class="w-50">
                <label class="col-5">FIR No : </label>
                <input class="col-7" type="text" name="FIR" value={inputs.FIR} onChange={handleInputChange}/>            
                </div>
                </div>

                <div class="row mr5">
                <div class="w-50 pdr-10">
                <label class="col-5">CC/RCC No : </label>
                <input class="col-7" type="text" name="RCC" value={inputs.RCC} onChange={handleInputChange}/>
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
                <div class="w-50">
                <label class="col-5">Police Station :  </label>
                <input class="col-7" type="text" name="policeStation" value={inputs.policeStation} onChange={handleInputChange}/>            
                </div>
                </div>

                <div class="row mr5">
                <div class="w-50 pdr-10">
                <label class="col-5">Court :  </label>
                <input class="col-7" type="text" name="court" value={inputs.court} onChange={handleInputChange}/>
                </div>
                <div class="w-50">
                <label class="col-5">Judge :  </label>
                <input class="col-7" type="text" name="judge" value={inputs.judge} onChange={handleInputChange}/>            
                </div>
                </div>
                </div>

                <div class="row mr5">
                <div class="w-50">
                    <label class="col-5 pdl-0">Complaint</label>
                    <textarea class="col-7 mrl-4" name="complaint" value={inputs.complaint} onChange={handleInputChange} />
                </div>

                <div class="w-50">
                    <label class="col-5">Accused</label>
                    <textarea class="col-7" name="accused" value={inputs.accused} onChange={handleInputChange} />
                </div>
                </div>

                <div class="row mr5">
                <div class="w-50">
                    <label class="col-5 pdl-0">Hearing Date</label>
                    <input type="date" class="col-7 mrl-4" name="hearingDate" value={inputs.hearingDate} onChange={handleInputChange}/>
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
                    <div class="col-7 pd-0">
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
                    <div class="col-7 pd-0">
                    <Select  name="CA" value={ca} onChange={e => setCA(e)} options={options}/>
                    </div>
                </div>

                <div class="w-50 row mr-0">
                    <label class="col-5">DNA Report</label>
                    <div class="col-7 pd-0">
                    <Select  name="DNA" value={dna} onChange={e => setDNA(e)} options={options}/>
                    </div>
                </div>
                </div>

                <div class="row mr5">
                <div class="w-50 row mr-0">
                    <label class="col-5">Handwriting Report</label>
                    <div class="col-7 pd-0">
                    <Select  name="handwritingReport" value={handwritingReport} onChange={e => setHandwritingReport} options={options}/>
                    </div>
                </div>
                </div>
                </div>

                <div>
                <label class="d-flex">Manpower :</label>
                <div class="row mr5">
                <div class="w-50 pdr-10">
                <label class="col-5">Pairani Name : </label>
                <input class="col-7"type="text" name="pairaniName" value={inputs.pairaniName} onChange={handleInputChange}/>
                </div>
                <div class="w-50">
                <label class="col-5">PP Name : </label>
                <input class="col-7" type="text" name="ppName" value={inputs.ppName} onChange={handleInputChange}/>            
                </div>
                </div>

                <div class="row mr5">
                <div class="w-50 pdr-10">
                <label class="col-5">IO Name : </label>
                <input class="col-7"type="text" name="ioName" value={inputs.ioName} onChange={handleInputChange}/>
                </div>
                </div>

                </div>
            </form>
        </React.Fragment>
     );
   }
    
export default Details;