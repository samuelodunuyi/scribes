<template>
    <div class="container">
      <div class="other-details pt-3 pl-2 pr-2">
        <div class="title">
          <h4>Other Details</h4>
        </div>
        <div class="d-flex ds justify-content-space-between">
          <div class="col-8">
            <div class="desc mt-1">
              <h4>Company Description</h4>
              <p><input type="text" placeholder="Provision of sustainable domestic energy solutions for people and businesses."></p>
            </div>
          </div>
          <div class="col-2">
            <div class="desc1 mt-1 ">
              <h4>Currency</h4>
              <p><input type="text" placeholder="(₦) Nigeria Naira"></p>
            </div>
          </div>
          <div class="col-2">
            <div class="desc1 mt-1">
              <h4>Sector</h4>
              <p>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Inputs to Infrastructure</option>
                  <option value="1">Inputs to Infrastructure</option>
                  <option value="2">Transport</option>
                  <option value="3">HealthCare</option>
                  <option value="4">On-grid Power</option>
                  <option value="5">Other</option>
                </select>
  
              </p>
            </div>
          </div>
        </div>
        <div class="d-flex ds justify-content-space-between">
          <div class="col-8">
            <div class="desc mt-1">
              <h4>Project Description</h4>
              <p><input type="text" placeholder="Abuja Disco proposed USD102mn financing of distribution energy resource programme to 50 unserved and underserved locations around Abuja"></p>
            </div>
          </div>
          <div class="col-2">
            <div class="desc1 mt-1 ">
              <h4>Project Type
                BrownField</h4>
              <p><select class="form-select" aria-label="Default select example">
                  <option selected>BrownField</option>
                  <option value="1">BrownField</option>
                  <option value="2">GreenField</option>
  
                </select></p>
            </div>
          </div>
          <div class="col-2">
            <div class="desc1 mt-1">
              <h4>Project Stage
                Concept</h4>
              <p>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Concept</option>
                  <option value="1">Concept</option>
                  <option value="2">Early Stage</option>
                  <option value="3">Mid Stage</option>
                  <option value="4">Commercial Operation</option>
  
                </select>
  
              </p>
            </div>
          </div>
        </div>
        <div class="status d-flex">
          <div class="comment">
            <h4>Status Comment</h4>
            <p><input type="text" placeholder="Awaiting conclusion of pilot programme and finalization of actual project cost"></p>
          </div>
          <div class="comment">
            <h4>Next Steps/Action Plan</h4>
            <p><input type="text" placeholder="Follow up with Ije Ikoku (AEDC), GVE Projects, Viathan, PWC"></p>
          </div>
          <div class="col-2">
            <div class="desc1 ">
              <h4>Initial Info/PIC
              </h4>
              <p><select class="form-select" aria-label="Default select example">
                  <option selected>No</option>
                  <option value="1">No</option>
                  <option value="2">Yes</option>
  
                </select></p>
            </div>
          </div>
          <div class="col-2">
            <div class="desc1">
              <h4>Categorisation</h4>
              <p>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Core Asset</option>
                  <option value="1">Core Asset</option>
                  <option value="2">Value-Add Asset</option>
                  <option value="3">Core Plus Asset</option>
                  <option value="4">Opportunistic</option>
  
                </select>
  
              </p>
            </div>
          </div>
        </div>
        <div class="status d-flex">
          <div class="comment">
            <h4>Details of project preparatory support/Tech Assist</h4>
            <p><input type="text" placeholder="PWC (via PIDG) and USTDA are already supporting to evaluate 28 customer clusters. Report pending"></p>
          </div>
          <div class="comment">
            <h4>Use of Proceeds</h4>
            <p><input type="text" placeholder="Distribution Network Upgrade and Overhaul"></p>
          </div>
          <div class="col-2">
            <div class="desc1 ">
              <h4>Total Project Size (Indicative)
              </h4>
              <p><input type="number" placeholder="₦ 150,000,000,000.00"></p>
            </div>
          </div>
          <div class="col-2">
            <div class="desc1">
              <h4>Debt Size (Indicative)</h4>
              <p><input type="number" placeholder="₦ 102,000,000,000.00"></p>
            </div>
          </div>
        </div>
  
        <div class="contact d-flex">
          <div class="initial">
            <h4>Initial Contact Date</h4>
            <p><input type="date" name="dateofbirth" id="dateofbirth"></p>
          </div>
          <div class="initial">
            <h4>Date of Last Contact</h4>
            <p><input type="date" name="dateofbirth" id="dateofbirth"></p>
          </div>
          <div class="initial">
            <h4>Nature of Last Interaction
              Email</h4>
            <p><select class="form-select" aria-label="Default select example">
                <option selected>Email</option>
                <option value="1">Email</option>
                <option value="2">Employee Referal</option>
                <option value="3">External Referal</option>
                <option value="4">Other</option>
              </select></p>
          </div>
          <div class="initial">
            <h4>Company Anniversary Date</h4>
            <p><input type="date" name="dateofbirth" id="dateofbirth"></p>
          </div>
          <div class="initial">
            <h4>Mandated Client</h4>
            <p><input type="text" class="form-control" placeholder="Search">
              <span class="input-group-text"><v-icon icon="mdi-magnify"></v-icon></span>
            </p>
          </div>
          <div class="initial">
            <h4>Deal Fact Sheet</h4>
            <p><select class="form-select" aria-label="Default select example">
                <option selected>No</option>
                <option value="1">No</option>
                <option value="2">Yes</option>
  
              </select></p>
          </div>
        </div>
        <div class="issue d-flex">
          <div class="issues mt-3">
            <h4>Deal Issues/Challenges</h4>
            <p><input type="text" placeholder="Need to see project documents for specific sites (e.g. Wuse Market with GVE; Idu Industrial with Viathan)"></p>
          </div>
  
          <div class="issuex">
            <h4>Project Preparatory Support
              Required
            </h4>
            <p><select class="form-select" aria-label="Default select example">
                <option selected>Yes</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
  
              </select></p>
          </div>
          <div class="issuex">
            <h4>Meeting Minutes Highlights
              Available?</h4>
            <p><select class="form-select" aria-label="Default select example">
                <option selected>Yes</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
  
              </select></p>
  
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  </script>
  
  <style scoped>
  .container {
    margin-left: 0px;
  }
  .other-details {
    width: 1270px;
    height: 568px;
    display: flex;
    padding: 10px 15px 20px 15px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    /*gap: 20px;*/
    align-self: stretch;
    border-radius: 5px;
    border: 0.885px solid var(--gray-200, #e4e4e7);
    background: var(--color-3, #fff);
    box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);
  }
  .title {
    display: flex;
    height: 44px;
    padding: 10px 0px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
    border-bottom: 2px solid #eee;
  }
  .title h4 {
    color: var(--black, #000);
    font-family: 'Inter';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }
  .desc {
    display: flex;
    width: 1310px;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    align-self: stretch;
  }
  .col-8 {
    width: 830px;
  }
  .col-2 {
    width: 200px;
  }
  
  .desc1 p {
    height: 40px;
    color: var(--black, #000);
    font-family: 'Inter';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14.4px;
    padding: 10px 20px 10px 10px;
    align-items: center;
    align-self: stretch;
    border-radius: 5px;
    border: 1px solid var(--gray-200, #e4e4e7);
    background: var(--white, #fff);
  }
  .desc h4,
  .comment h4,
  .initial h4,
  .issuex h4,
  .issues h4,
  .currency h4,
  .desc1 h4 {
    color: var(--black, #000);
    font-family: 'Inter';
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 14.4px;
  }
  .desc p {
    color: var(--black, #000);
    font-family: 'Inter';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14.4px;
    display: flex;
    height: 40px;
    width: 830px;
    padding: 10px 20px 10px 10px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 5px;
    border: 1px solid var(--gray-200, #e4e4e7);
    background: var(--white, #fff);
  }
  .comment {
    display: flex;
    width: 405px;
    flex-direction: column;
    align-items: flex-start;
    gap: 1px;
    align-self: stretch;
    border-radius: 5px;
  }
  .comment p {
    color: var(--black, #000);
    font-family: 'Inter';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14.4px;
    display: flex;
    height: 40px;
    width: 405px;
    padding: 10px 20px 10px 10px;
    align-items: center;
  
    align-self: stretch;
    border-radius: 5px;
    border: 1px solid var(--gray-200, #e4e4e7);
    background: var(--white, #fff);
  }
  .form-control {
    border: none;
  }
  input {
    width: 100%;
  }
  input::placeholder {
    color: var(--grey-dark, #000);
    font-family: 'Inter';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14.4px;
    width: 100%;
  }
  .form-control::placeholder {
    color: var(--grey-dark, #808080);
    font-family: 'Inter';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14.4px;
  }
  .status {
    gap: 15px;
  }
  .contact {
    gap: 10px;
  }
  .initial,
  .desc1 {
    display: flex;
    width: 200px;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  .issuex {
    display: flex;
    width: 200px;
    height: 74px;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  .initial p,
  .issuex p,
  .currency p,
  .desc1 p {
    display: flex;
    height: 40px;
    padding: 10px 20px 10px 10px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    border-radius: 5px;
    border: 1px solid var(--gray-200, #e4e4e7);
    background: var(--white, #fff);
  }
  .initial input {
    width: 130px;
    height: 37px;
    border-radius: 5px;
  }
  .input-group-text {
    border: none;
    background: #fff;
    width: 16px;
    height: 16px;
  }
  .initial select,
  .issuex select,
  .desc1 select {
    width: 200px;
    border: none;
    color: var(--black, #000);
    font-family: 'Inter';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14.4px;
  }
  .issue {
    gap: 10px;
  }
  .issues {
    display: flex;
    width: 430px;
    height: 60px;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    align-self: stretch;
  }
  .issues p {
    color: var(--black, #000);
    font-family: 'Inter';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14.4px;
    display: flex;
    height: 40px;
    padding: 10px 20px 10px 10px;
    align-items: center;
    gap: 20px;
    align-self: stretch;
    border-radius: 5px;
    border: 1px solid var(--gray-200, #e4e4e7);
    background: var(--white, #fff);
  }
  .ds {
    align-self: stretch;
    gap: 10px;
  }
  .currency {
    display: flex;
    width: 200px;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    margin-left: 0px;
  }
  </style>