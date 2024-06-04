<template>
    <div class="container">
      <div class="card">
        <div class="card-title">
          <h4>Contact Details</h4>
        </div>
        <div class="wrap">
          <div class="name">
            <div class="names">
              <p>First Name</p>
              <input type="text">
            </div>
            <div class="names">
              <p>Last Name</p>
              <input type="text">
            </div>
            <div class="names">
              <p>Phone Number</p>
              <input type="text">
            </div>
          </div>
          <div class="name mt-3">
            <div class="names">
              <p>Email Address</p>
              <input type="text">
            </div>
            <div class="names">
              <p>Company Name</p>
              <input type="text">
            </div>
            <div class="names">
              <p>Sector</p>
              <select class="form-select" aria-label="Default select example">
                <option selected>Input to Infrastructure</option>
                <option value="1">Input to Infrastructure</option>
                <option value="2">HealthCare</option>
                <option value="3">Transport</option>
                <option value="4">On-grid Power</option>
                <option value="5">Other</option>
              </select>
            </div>
          </div>
          <div class="name mt-3">
            <div class="names">
              <p>Referred Source Name</p>
              <input type="text">
            </div>
            <div class="names">
              <p>Lead Source</p>
              <select class="form-select" aria-label="Default select example">
                <option selected>Email</option>
                <option value="1">Email</option>
                <option value="2">Employee Referral</option>
                <option value="3">External Referral</option>
                <option value="5">Other</option>
              </select>
            </div>
  
          </div>
        </div>
      </div>
      <div class="deal-team mt-3">
        <div class="title">
          <h4>Deal Team</h4>
        </div>
        <div class="team">
          <div class="name mt-3">
            <div class="names">
              <p>Originator
              </p>
              <select class="form-select" aria-label="Default select example">
                <option selected>Chinua Azubike</option>
                <option value="1">Chinua Azubike</option>
                <option value="2">Daniel Mueller</option>
                <option value="3">Collins Eguakun</option>
                <option value="4">Lola Oyebola</option>
                <option value="5">Uzo Okoro</option>
              </select>
            </div>
            <div class="names">
              <p>Administrator
              </p>
              <select class="form-select" aria-label="Default select example">
                <option selected>Khadijah Salami</option>
                <option value="1">Chinua Azubike</option>
                <option value="2">Daniel Mueller</option>
                <option value="3">Collins Eguakun</option>
                <option value="4">Lola Oyebola</option>
                <option value="5">Uzo Okoro</option>
              </select>
            </div>
            <div class="names">
              <p>Lead Transactor
              </p>
              <select class="form-select" aria-label="Default select example">
                <option selected>Daniel Muller</option>
                <option value="1">Chinua Azubike</option>
                <option value="2">Daniel Mueller</option>
                <option value="3">Collins Eguakun</option>
                <option value="4">Lola Oyebola</option>
                <option value="5">Uzo Okoro</option>
              </select>
            </div>
          </div>
          <div class="name mt-3">
            <div class="names">
              <p>Originator
              </p>
              <select class="form-select" aria-label="Default select example">
                <option selected>Chinua Azubike</option>
                <option value="1">Chinua Azubike</option>
                <option value="2">Daniel Mueller</option>
                <option value="3">Collins Eguakun</option>
                <option value="4">Lola Oyebola</option>
                <option value="5">Uzo Okoro</option>
              </select>
            </div>
            <div class="names">
              <p>Administrator
              </p>
              <select class="form-select" aria-label="Default select example">
                <option selected>Khadijah Salami</option>
                <option value="1">Chinua Azubike</option>
                <option value="2">Daniel Mueller</option>
                <option value="3">Collins Eguakun</option>
                <option value="4">Lola Oyebola</option>
                <option value="5">Uzo Okoro</option>
              </select>
            </div>
  
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
      
  </script>
  
  <style scoped>
  .card {
    display: flex;
    width: 620px;
    height: 314px;
    padding: 10px 15px 20px 15px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
  }
  .card-title {
    display: flex;
    height: 44px;
    padding: 10px 0px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
    border-bottom: 2px solid #eee;
  }
  .card-title h4,
  .title h4 {
    color: var(--black, #000);
    font-family: 'Inter';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }
  .title {
    align-self: stretch;
    border-bottom: 2px solid #eee;
  }
  .wrap {
    padding: 0;
    background: #fff;
  }
  .name {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
    width: 200px;
    height: 60px;
    gap: 5px;
  }
  .names {
    display: flex;
    width: 200px;
    flex-direction: column;
    align-items: flex-start;
  }
  .names p {
    color: var(--black, #000);
    font-family: 'Inter';
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 14.4px;
  }
  .names input {
    display: flex;
    height: 40px;
    width: 195px;
    padding: 10px 20px 10px 10px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 5px;
    border: 1px solid var(--gray-200, #e4e4e7);
    background: var(--white, #fff);
  }
  .names select {
    width: 195px;
    height: 40px;
  }
  select {
    color: var(--black, #000);
    text-align: left;
    font-family: 'Inter';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14.4px;
  }
  .deal-team {
    display: flex;
    width: 620px;
    height: 234px;
    padding: 10px 15px 20px 15px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    border-radius: 5px;
    border: 0.885px solid var(--gray-200, #e4e4e7);
    background: var(--color-3, #fff);
    box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);
  }
  </style>