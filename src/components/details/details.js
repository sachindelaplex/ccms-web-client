import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './details.css';
import axios from 'axios';

const Details = (props) => {   

    console.log('details page');
    const [inputs, setInputs] = useState({});

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
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
                <input class="col-7" type="date" name="regDate" value={inputs.regTime} onChange={handleInputChange}/>
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
                    <label class="col-5">Complaint</label>
                    <textarea name="complaint" value={inputs.complaint} onChange={handleInputChange} />
                </div>

                <div class="w-50">
                    <label class="col-5">Accused</label>
                    <textarea name="accused" value={inputs.accused} onChange={handleInputChange} />
                </div>
                </div>


                <div>
                    <label>Hearing Date</label>
                    <input type="date" name="hearingDate" value={inputs.hearingDate} onChange={handleInputChange}/>
                </div>

            </form>
        </React.Fragment>
     );
   }
    
export default Details;