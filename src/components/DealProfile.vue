<template>

  <div class="col-8" style="height:474px;width:895px">
    <div class="card" style="height:474px;width:846px">
      <div class="card-body">
        <div class="col-xl-12 col-lg-12">
          <div class="ms-panel ms-panel-fh ms-facebook-engagements">
            <div class="ms-panel-header">
              <h6 style="color: #000;font-size: 20px;font-family: 'Inter';font-style: normal;font-weight: 600;line-height: 24px;">Deal Profile</h6>
            </div>
            <div class="form-row mt-3 d-flex justify-content-around">
              <div class="col-3">
                <label for="industry" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">Industry</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Inputs to Infrastructure</option>
                  <option value="1">Transport</option>
                  <option value="2">HealthCare</option>
                  <option value="3">On-grid Power</option>
                  <option value="4">Water/Waste</option>

                </select>
              </div>
              <div class="col-3">
                <label for="products" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">Products</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select Product</option>
                  <option value="1">Public Bond</option>
                  <option value="2">Annuity PPP</option>
                  <option value="3">Blended Finance</option>
                  <option value="4">Private Bond(Other)</option>

                </select>
              </div>
              <div class="col-3">
                <label for="region" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">Region</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select Region</option>
                  <option value="1">SW</option>
                  <option value="2">SS</option>
                  <option value="3">SE</option>
                  <option value="4">NW</option>
                  <option value="5">NC</option>
                </select>
              </div>
              <div class="col-3">
                <label for="dealSize" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">* Deal Size(#'BN)</label>
                <input type="text" class="form-control" id="dealSize" placeholder="30">
              </div>
            </div>
            <div class="form-row mt-3 d-flex justify-content-around">
              <div class="col-3">
                <label for="industry" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">* Coupon(%)</label>
                <input type="text" class="form-control" id="industry" placeholder="16">
              </div>
              <div class="col-3">
                <label for="products" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">* Tenor(yrs)</label>
                <input type="text" class="form-control" id="products" placeholder="18">
              </div>
              <div class="col-3">
                <label for="region" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">* Moratorium(yrs)</label>
                <input type="text" class="form-control" id="region" placeholder="16">
              </div>
              <div class="col-3">
                <label for="dealSize" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">Repayment Frequency</label>
                <details class="custom-select" style="position:absolute;right:26px;padding-left:0px;width:165px">
                  <summary class="radios">
                    <input type="radio" name="item" id="default" title="Monthly" checked>
                    <input type="radio" name="item" id="item1" title="Monthly">
                    <input type="radio" name="item" id="item2" title="Quarterly">
                    <input type="radio" name="item" id="item3" title="Semi-Annually">
                    <input type="radio" name="item" id="item4" title="Annually">
                  </summary>
                  <ul class="list">
                    <li>
                      <label for="item1">
                        Monthly
                        <span></span>
                      </label>
                    </li>
                    <li>
                      <label for="item2">Quarterly</label>
                    </li>
                    <li>
                      <label for="item3">Semi-Annually</label>
                    </li>
                    <li>
                      <label for="item4">Annually</label>
                    </li>
                  </ul>
                </details>
              </div>
            </div>
            <div class="form-row mt-3 d-flex justify-content-around">
              <div class="col-3">
                <label for="industry" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">Amortisation Style</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select Style</option>
                  <option value="1">Straight-line</option>
                  <option value="2">Annuity</option>
                  <option value="3">Any Other</option>
                </select>
              </div>
              <div class="col-3">
                <label for="products" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">Mandate Letter</label>
                <input type="date" name="dateofbirth" id="dateofbirth" style="width:170px;height:37px;border-radius:5px;border:1px solid #ddd">
              </div>
              <div class="col-3">
                <label for="region" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">* Credit Approval</label>
                <input type="date" name="dateofbirth" id="dateofbirth" style="width:170px;height:37px;border-radius:5px;border:1px solid #ddd">
              </div>
              <div class="col-3">
                <label for="dealSize" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">Fee Letter</label>
                <input type="date" name="dateofbirth" id="dateofbirth" style="width:170px;height:37px;border-radius:5px;border:1px solid #ddd">
              </div>
            </div>
            <div class="form-row mt-3 d-flex justify-content-around">
              <div class=" col-3">
                <label for="industry" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">Expected Close</label>
                <input type="date" name="dateofbirth" id="dateofbirth" style="width:170px;height:37px;border-radius:5px;border:1px solid #ddd">
              </div>
              <div class="col-3">
                <label for="products" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">Actual Close</label>
                <input type="date" name="dateofbirth" id="dateofbirth" style="width:170px;height:37px;border-radius:5px;border:1px solid #ddd">
              </div>
              <div class="col-3">
                <label for="region" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">NBC Approval</label>
                <input type="date" name="dateofbirth" id="dateofbirth" style="width:170px;height:37px;border-radius:5px;border:1px solid #ddd">
              </div>
              <div class="col-3">
                <label for="dealSize" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">CC Submission</label>
                <input type="date" name="dateofbirth" id="dateofbirth" style="width:170px;height:37px;border-radius:5px;border:1px solid #ddd">
              </div>

            </div>
            <div class="form-row mt-3 justify-content-around ml-4">
              <div class="col-3">
                <label for="dealSize" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">NBC Submission</label>
                <input type="date" name="dateofbirth" id="dateofbirth" style="width:170px;height:37px;border-radius:5px;border:1px solid #ddd">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.col-3 {
  width: 170px;
}

details {
  position: relative;
  width: 175px;
  margin-right: 1rem;
  border: 0px;
}

details[open] {
  z-index: 1;
}

summary {
  padding: 1rem;
  cursor: pointer;
  border-radius: 5px;
  background-color: #fff;
  list-style: none;
  border: 1px solid #ddd;
  position: relative;
  height: 37px;
  width: 175px;
}

summary::-webkit-details-marker {
  display: none;
}

details[open] summary:before {
  content: "";
  display: block;
  width: 100vw;
  height: 100vh;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
}

summary:after {
  content: "";
  display: inline-block;
  float: right;
  width: 0.5rem;
  height: 0.5rem;
  border-bottom: 1px solid currentColor;
  border-left: 1px solid currentColor;
  border-bottom-left-radius: 2px;
  transform: rotate(225deg) translate(-1%, 0%);
  transform-origin: center center;
  transition: transform ease-in-out 100ms;
}

summary:focus {
  outline: none;
}

details[open] summary:after {
  transform: rotate(-45deg) translate(0%, 0%);
}

ul {
  width: 100%;
  background: #fff;
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  padding: 1rem;
  margin: 0;
  box-sizing: border-box;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
}

li {
  margin: 0;
  padding: 0.3rem 0;
}

li:first-child {
  padding-top: 0;
}

li:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

/* FAKE SELECT */

summary.radios {
  counter-reset: radios;
}

summary.radios:before {
  content: var(--selection);
}

input[type="radio"] {
  counter-increment: radios;
  appearance: none;
  display: none;
}

input[type="radio"]:checked {
  display: inline;
  --display: block;
  position: absolute;
  top: 6px;
}

input[type="radio"]:after {
  content: attr(title);
  display: inline;
  font-size: 1rem;
}

ul.list {
  counter-reset: labels;
}

label {
  width: 100%;
  display: flex;
  cursor: pointer;
  justify-content: space-between;
}

label span {
  --display: none;
  display: var(--display);
  width: 1rem;
  height: 1rem;
  border: 1px solid #000;
  border-radius: 3px;
}

label:hover {
  background-color: #e8e6e6;
}
</style>