

<template>
  <div>
    <div class="box-card">

      <h4> Transaction </h4>
      <div class="row g-2">


        <div class="col-3">
          <label class="form-label">Client Name </label>
          <input type="text" class="form-control">
        </div>

        <div class="col-3">
          <label class="form-label">Originator </label>
          <select class="form-select">
            <option selected>Inputs to infracstructure</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

        <div class="col-3">
          <label class="form-label">Transactor </label>
          <select class="form-select">
            <option selected>Inputs to infracstructure</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="col-3">
          <label class="form-label">Transactor Legal Lead </label>
          <select class="form-select">
            <option selected>Inputs to infracstructure</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

      </div>


    </div>

    <div class="box-card">

      <h4> Deal Profile </h4>
      <div class="row g-2">

        <div class="col-3">
          <label class="form-label">Industry </label>
          <select class="form-select">
            <option selected>Inputs to infracstructure</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

        <div class="col-3">
          <label class="form-label"> Products </label>
          <select class="form-select">
            <option selected>Inputs to infracstructure</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="col-3">
          <label class="form-label">Region </label>
          <select class="form-select">
            <option selected>Inputs to infracstructure</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

        <div class="col-3">
          <label class="form-label">* Deal Size (₦'BN) </label>
          <input type="text" class="form-control">
        </div>
      </div>

      <div class="row g-2">

        <div class="col-3">
          <label class="form-label">* Coupon(%) </label>
          <input type="number" class="form-control">
        </div>
        <div class="col-3">
          <label class="form-label">* Tenor(yrs) </label>
          <input type="number" class="form-control">
        </div>
        <div class="col-3">
          <label class="form-label">* Moratorium(yrs) </label>
          <input type="number" class="form-control">
        </div>

        <div class="col-3">
          <label class="form-label"> Repayment Frequency </label>
          <select class="form-select">
            <option selected>Inputs to infracstructure</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>

      <div class="row g-2">

        <div class="col-3">
          <label class="form-label"> Amortisation Style </label>
          <select class="form-select">
            <option selected>Select</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

        <div class="col-3">
          <label class="form-label">Mandate Letter </label>
          <input type="date" class="form-control">
        </div>
        <div class="col-3">
          <label class="form-label">Credit Approval </label>
          <input type="date" class="form-control">
        </div>
        <div class="col-3">
          <label class="form-label">Fee Letter </label>
          <input type="date" class="form-control">
        </div>
      </div>

      <div class="row g-2">

        <div class="col-3">
          <label class="form-label">Expected Close </label>
          <input type="date" class="form-control">
        </div>
        <div class="col-3">
          <label class="form-label">Actual Close </label>
          <input type="date" class="form-control">
        </div>
        <div class="col-3">
          <label class="form-label">NBC Approval </label>
          <input type="date" class="form-control">
        </div>
        <div class="col-3">
          <label class="form-label">NBC Submission </label>
          <input type="date" class="form-control">
        </div>
        <div class="col-3">
          <label class="form-label">CC Submission </label>
          <input type="date" class="form-control">
        </div>

      </div>





    </div>

    <div class="box-card">
      <h4> Funding Options </h4>
      <div class="px-2">
        <div class="d-flex gap-3">


          <div class="custom-checkbox d-flex justify-content-center align-center">

            <div class="form-check ">
              <input class="form-check-input alt" type="checkbox" value="" id="BOI">
              <label class="form-check-label alt" for="BOI">
                BOI
              </label>
            </div>
          </div>

          <div class="custom-checkbox d-flex justify-content-center align-center">

            <div class="form-check ">
              <input class="form-check-input alt" type="checkbox" value="" id="DCM">
              <label class="form-check-label alt" for="DCM">
                DCM
              </label>
            </div>
          </div>

          <div class="custom-checkbox d-flex justify-content-center align-center">

            <div class="form-check ">
              <input class="form-check-input alt " type="checkbox" value="" id="PCB">
              <label class="form-check-label alt  " for="PCB">
                PCB
              </label>
            </div>
          </div>


        </div>

      </div>
    </div>


  </div>
</template>

<style scoped>
.box-card {
  border: 1px solid #E4E4E7;
  margin: 25px 0;
}

.row {
  padding: 10px;
}

.box-card h4 {
  width: 100%;
  background: #E4E4E7;
  padding: 10px 10px;
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
}

label.form-label {
  /* Capion Bold */
  font-size: 14px;
  font-weight: 700;
  line-height: 14.4px;
}

input :not(.alt),
input[type=date],
select {
  padding: 10px 20px 10px 10px;
  align-items: center;

  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
}

.custom-checkbox {
  width: 80px;
  border-radius: 6px;
  border: 1px solid var(--primary, #3478F6);
  padding: 5px 20px 5px 10px;
  gap: 10px;

}
</style>