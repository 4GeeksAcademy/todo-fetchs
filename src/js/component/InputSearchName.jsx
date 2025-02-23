import React from "react";



const InputSearchName =()=>{
    return(
        <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label htmlFor="inputPassword6" className="col-form-label">username</label>
        </div>
        <div className="col-auto">
          <input type="text" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline"/>
        </div>
       
      </div>
    )
}
export default InputSearchName