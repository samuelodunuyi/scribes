<script setup>
import DealProfile from "./DealProfile.vue"
import FocusArea from './FocusArea.vue'
</script>

<template>
  <div class="main">

    <div class="container-fluid">
      <div class="row" style="width:100%;height:100%">
        <div class="col-8" style="height:610px;width:874px">
          <div class="row">
            <div class="col-6" style="height:682px;">
              <div class="sixth">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="card" style="height:682px;width:425px">
                      <div class="card-body">
                        <div class="col-xl-12 col-lg-12">
                          <div class="ms-panel ms-panel-fh ms-facebook-engagements">
                            <div class="ms-panel-header">
                              <h6 style="color: var(--black, #000);font-size: 20px;font-family: 'Inter';font-style: normal;font-weight: 600;line-height: 24px;">Transaction Update</h6>
                            </div>

                            <div class="client-details d-flex justify-content-between mt-3" style="position:relative">
                              <div class="col-6" style="width:100%">
                                <div class="form-outline" style="position:absolute;left:0px">
                                  <label class="form-label" for="form6Example1" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">Client Name</label>
                                  <input type="text" id="form6Example1" class="form-control" style="width:185px;height:40px" placeholder="Lagos Free Zone Company" />

                                </div>
                              </div>
                              <div class="col-6">
                                <div class="form-outline" style="position:absolute;left:200px">
                                  <label class="form-label" for="form6Example2" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">Originator Name</label>
                                  <select class="form-select" aria-label="Default select example">
                                    <option selected>Select Originator</option>
                                    <option value="1">Chinua Azubuike</option>
                                    <option value="2">Daniel Mueller</option>
                                    <option value="3">Collins Eguakun</option>
                                    <option value="4">Lola Oyebola</option>
                                    <option value="5">Uzo Okoro</option>
                                  </select>

                                </div>
                              </div>
                            </div>
                            <div class="transaction-details d-flex justify-content-between mt-4">
                              <div class="col-6 mt-5" style="position:relative;">
                                <div class="form-outline" style="position:absolute;left:0px;">
                                  <label class="form-label" for="form6Example1" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">Transactor</label>

                                  <select class="form-select" aria-label="Default select example">
                                    <option selected>Select Transactor</option>
                                    <option value="1">Chinua Azubuike</option>
                                    <option value="2">Daniel Mueller</option>
                                    <option value="3">Collins Eguakun</option>
                                    <option value="4">Lola Oyebola</option>
                                    <option value="5">Uzo Okoro</option>
                                  </select>

                                </div>
                              </div>
                              <div class="col-6 mt-5">
                                <div class="form-outline">
                                  <label class="form-label" for="form6Example2" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;margin-left:2px">Transactor Legal Lead</label>
                                  <select class="form-select" aria-label="Default select example">
                                    <option selected>Select Lead</option>
                                    <option value="1">Chinua Azubuike</option>
                                    <option value="2">Daniel Mueller</option>
                                    <option value="3">Collins Eguakun</option>
                                    <option value="4">Lola Oyebola</option>
                                    <option value="5">Uzo Okoro</option>
                                  </select>

                                  <div class="line mt-3"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="update-wrap mt-3">
                            <div class="t-updates">
                              <h6>Transaction Updates</h6>
                              <div class="updates mt-3">
                                <div class="picsdate d-flex">
                                  <div class="pics">
                                    <img src="../assets/doctor-5.jpg" alt="Daniel"><span class="dot"></span>
                                  </div>
                                  <div class="posts">
                                    <h6 class="pt-2">Mandates has been created sent to client, awaiting response from them.</h6>
                                  </div>
                                </div>
                                <span style="font-size:12px;color:#b3b1b1;margin-left:40px">Daniel Mueller 16/09/2022 2:20pm</span>
                              </div>
                            </div>

                            <div class="updates mt-3">
                              <div class="picsdate d-flex">
                                <div class="pics">
                                  <img src="../assets/doctor-5.jpg" alt="Daniel"><span class="dots"></span>
                                </div>
                                <div class="posts">
                                  <h6 class="pt-2">Mandates has been created sent to client, awaiting response from them.</h6>
                                </div>
                              </div>
                              <span style="font-size:12px;color:#b3b1b1;margin-left:40px">Chinua Azubuike 03/10/2022 4:17pm</span>
                            </div>

                            <div class="updates mt-3">
                              <div class="picsdate d-flex">
                                <div class="pics">
                                  <img src="../assets/doctor-5.jpg" alt="Daniel"><span class="dots"></span>
                                </div>
                                <div class="posts">
                                  <h6 class="pt-2">Mandates has been signed and returned back. Moving clients to TRMS.</h6>
                                </div>
                              </div>
                              <span style="font-size:12px;color:#b3b1b1;margin-left:40px">Daniel Mueller 03/10/2022 4:17pm</span>
                            </div>

                          </div>
                          <div class="input-btn d-flex mt-5">

                            <input type="text" id="form6Example1" class="form-control border-outline-none" placeholder="Type your update" style="width:290px;border-radius: 0px 8px 8px 8px;background: var(--white, #FFF);box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.10);" /><button style="background:#47B65C;color:white;width:70px;border-radius:10px;border:none;margin-left:10px;">Send</button>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="col" style="height:682px;">
              <div class="sixth">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="card" style="height:682px;width:412px;margin-left:0px;
box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.10);">
                      <div class="card-body">
                        <div class="col-xl-12 col-lg-12">
                          <div class="ms-panel ms-panel-fh ms-facebook-engagements">
                            <div class="ms-panel-header">
                              <h4>Deal Category</h4>

                            </div>
                            <div class="category-wrap">
                              <div class="red">
                                <h5>Red Category</h5>
                                <div class="r-requirements">
                                  <div class="list d-flex mb-1" style="position:relative">
                                    <h6>Mandate Letter signed:</h6>
                                    <div class="switchToggle" style="position:absolute;right:0px">
                                      <input type="checkbox" class="cmn-toggle cmn-toggle-round-flat" id="switch">
                                      <label for="switch">Toggle</label>
                                    </div>

                                  </div>
                                  <div class="list d-flex mb-1" style="position:relative">
                                    <h6>Due diligence ongoing:</h6>
                                    <div class="switchToggle1" style="position:absolute;right:0px">
                                      <input type="checkbox" class="cmn-toggle1 cmn-toggle-round-flat" id="switch1">
                                      <label for="switch1">Toggle</label>
                                    </div>

                                  </div>
                                  <div class="list d-flex mb-1" style="position:relative">
                                    <h6>Pending Credit Committe approval:</h6>
                                    <div class="switchToggle2" style="position:absolute;right:0px">
                                      <input type="checkbox" class="cmn-toggle2 cmn-toggle-round-flat" id="switch2">
                                      <label for="switch2">Toggle</label>
                                    </div>

                                  </div>

                                  <div class="list d-flex mb-1" style="position:relative">
                                    <h6 class="w" style="width:270px">Transaction has obtained Credit Committee approval:</h6>
                                    <div class="switchToggle3" style="position:absolute;right:0px">
                                      <input type="checkbox" class="cmn-toggle3 cmn-toggle-round-flat" id="switch3">
                                      <label for="switch3">Toggle</label>
                                    </div>

                                  </div>
                                </div>
                              </div>
                              <div class="amber">
                                <h5 class="mb-3">Amber Category</h5>
                                <div class="r-requirements">
                                  <div class="list d-flex mb-1" style="position:relative">
                                    <h6>Mandate Letter signed:</h6>
                                    <div class="switchToggle5" style="position:absolute;right:0px">
                                      <input type="checkbox" class="cmn-toggle5 cmn-toggle-round-flat" id="switch5">
                                      <label for="switch5">Toggle</label>
                                    </div>

                                  </div>
                                  <div class="list d-flex mb-1" style="position:relative">
                                    <h6 class="w" style="width:270px">Professional Parties to the Bond issue appointed or selected:</h6>
                                    <div class="switchToggle6" style="position:absolute;right:0px">
                                      <input type="checkbox" class="cmn-toggle6 cmn-toggle-round-flat" id="switch6">
                                      <label for="switch6">Toggle</label>
                                    </div>

                                  </div>
                                  <div class="list d-flex mb-1" style="position:relative">
                                    <h6 class="w" style="width:270px">Fee Letter and/or Guarantee Documentation expected to be negotiated and/or signed within 8 weeks
                                      :</h6>
                                    <div class="switchToggle7" style="position:absolute;right:0px">
                                      <input type="checkbox" class="cmn-toggle7 cmn-toggle-round-flat" id="switch7">
                                      <label for="switch7">Toggle</label>
                                    </div>

                                  </div>
                                  <div class="list d-flex mb-1" style="position:relative">
                                    <h6 class="w" style="width:270px">
                                      All Materials CPs with timelines for completion agreed with the client:</h6>
                                    <div class="switchToggle8" style="position:absolute;right:0px">
                                      <input type="checkbox" class="cmn-toggle8 cmn-toggle-round-flat" id="switch8">
                                      <label for="switch8">Toggle</label>
                                    </div>

                                  </div>

                                  <div class="list d-flex mb-1" style="position:relative">
                                    <h6 class="w" style="width:270px">Executed Fee Letter and/or Guarantee Documentation</h6>
                                    <div class="switchToggle3" style="position:absolute;right:0px">
                                      <input type="checkbox" class="cmn-toggle3 cmn-toggle-round-flat" id="switch3">
                                      <label for="switch3">Toggle</label>
                                    </div>

                                  </div>
                                </div>
                              </div>
                              <div class="green">
                                <h5 class="mb-3">Green Category</h5>
                                <div class="r-requirements">
                                  <div class="list d-flex mb-1" style="position:relative">
                                    <h6 class="w" style="width:270px">Transaction has obtained Credit Committee approval:</h6>
                                    <div class="switchToggle9" style="position:absolute;right:0px">
                                      <input type="checkbox" class="cmn-toggle9 cmn-toggle-round-flat" id="switch9">
                                      <label for="switch9">Toggle</label>
                                    </div>

                                  </div>
                                  <div class="list d-flex mb-1" style="position:relative">
                                    <h6 class="w" style="width:270px">Guarantee Document in agreed form:</h6>
                                    <div class="switchToggle10" style="position:absolute;right:0px">
                                      <input type="checkbox" class="cmn-toggle10 cmn-toggle-round-flat" id="switch10">
                                      <label for="switch10">Toggle</label>
                                    </div>

                                  </div>
                                  <div class="list d-flex mb-1" style="position:relative">
                                    <h6 class="w" style="width:270px">Professional Parties of the Bond Issue appointed or selected
                                      :</h6>
                                    <div class="switchToggle11" style="position:absolute;right:0px">
                                      <input type="checkbox" class="cmn-toggle11 cmn-toggle-round-flat" id="switch11">
                                      <label for="switch11">Toggle</label>
                                    </div>

                                  </div>
                                  <div class="list d-flex mb-1" style="position:relative">
                                    <h6 class="w" style="width:270px">
                                      Already filed or expected filing with SEC(or equivalent Exchange)within 6 weeks:</h6>
                                    <div class="switchToggle12" style="position:absolute;right:0px">
                                      <input type="checkbox" class="cmn-toggle12 cmn-toggle-round-flat" id="switch12">
                                      <label for="switch12">Toggle</label>
                                    </div>

                                  </div>
                                  <div class="list d-flex mb-1" style="position:relative">
                                    <h6 class="l" style="width:270px">All Materials CPs to Financial Close have been satisfactory met by the Client for completion before Financial Close:</h6>
                                    <div class="switchToggle13" style="position:absolute;right:0px">
                                      <input type="checkbox" class="cmn-toggle13 cmn-toggle-round-flat" id="switch13">
                                      <label for="switch13">Toggle</label>
                                    </div>

                                  </div>
                                  <div class="list d-flex mb-1" style="position:relative">
                                    <h6>Financial Close expected within 3-6 months:</h6>
                                    <div class="switchToggle14" style="position:absolute;right:0px">
                                      <input type="checkbox" class="cmn-toggle14 cmn-toggle-round-flat" id="switch14">
                                      <label for="switch14">Toggle</label>
                                    </div>

                                  </div>
                                  <div class="list d-flex mb-1" style="position:relative">
                                    <h6>Transaction has reached financial close(executed deed of guarantee and/or disbursement)</h6>
                                    <div class="switchToggle14" style="position:absolute;right:0px">
                                      <input type="checkbox" class="cmn-toggle14 cmn-toggle-round-flat" id="switch14">
                                      <label for="switch14">Toggle</label>
                                    </div>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3" style="width:100%">
            <DealProfile />

          </div>
          <div class="row mt-3" style="width:100%">

            <FocusArea />
          </div>

        </div>
        <div class="col-4" style="height:800px;width:395px">
          <div class="contact-details">
            <div class="card" style="height:284px;width:405px">
              <div class="card-body">
                <div class="col-xl-12 col-lg-12">
                  <div class="ms-panels ms-panel-fh ms-facebook-engagements">
                    <div class="ms-panel-header">
                      <h6 class="fees">Fees</h6>
                    </div>
                    <div class="amount d-flex justify-content-between mt-1">
                      <div class="form-group mt-2">
                        <label for="usr">Amount(#'MN)</label>
                        <input type="text" class="form-control mt-1" id="usr" style="width:180px" placeholder="16">
                      </div>
                      <div class="form-group mt-2">
                        <label for="usr" style="margin-left:10px">Advance(%)</label>
                        <input type="text" class="form-control mt-1" id="usr" style="width:180px;margin-left:10px" placeholder="2.5">
                      </div>
                    </div>
                    <div class="final d-flex justify-content-between mt-1">
                      <div class="form-group mt-2">
                        <label for="usr">Final(%)</label>
                        <input type="text" class="form-control mt-1" id="usr" style="width:180px" placeholder="98">
                      </div>
                      <div class="form-group mt-2">
                        <label for="usr" style="margin-left:10px">Guarantee(%)</label>
                        <input type="text" class="form-control mt-1" id="usr" style="width:180px;margin-left:10px" placeholder="1">
                      </div>
                    </div>
                    <div class="final d-flex justify-content-between mt-1">
                      <div class="form-group mt-2">
                        <label for="usr">Monitoring(#'MN)</label>
                        <input type="text" class="form-control mt-1" id="usr" style="width:180px" placeholder="4">
                      </div>
                      <div class="form-group mt-2">
                        <label for="usr" style="margin-left:10px">Reimbursable(#'MN)</label>
                        <input type="text" class="form-control mt-1" id="usr" style="width:180px;margin-left:10px" placeholder="0">
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div class="transaction-parties mt-3">
            <div class="card" style="height:310px;width:405px">
              <div class="card-body">
                <div class="col-xl-12 col-lg-12">
                  <div class="ms-panel ms-panel-fh ms-facebook-engagements pb-2">
                    <div class="ms-panel-header">
                      <h6 class="fees">Transaction Parties</h6>
                    </div>
                    <div class="amount d-flex justify-content-between">
                      <div class="form-group mt-2">
                        <label for="usr">Role</label>
                        <input type="text" class="form-control mt-1" id="usr" style="width:370px" placeholder="Lead Issuing House">
                      </div>

                    </div>
                    <div class="final d-flex justify-content-between">
                      <div class="form-group mt-2" style="position:relative;">
                        <label for="usr">Appointed</label>

                        <select class="form-select mt-1" aria-label="Default select example">
                          <option selected>Select</option>
                          <option value="1">No</option>
                          <option value="2">Yes</option>

                        </select>

                      </div>
                      <div class="form-group mt-2">
                        <label for="usr" style="margin-left:10px">Party</label>
                        <input type="text" class="form-control mt-1" id="usr" style="width:185px;margin-left:10px" placeholder="Stanbic IBTC Capital">
                      </div>
                    </div>
                    <div class="amount d-flex justify-content-between" style="position:relative;">
                      <div class="form-group mt-2 mb-3">
                        <label for="usr">Status</label>
                        <input type="text" class="form-control mt-1" id="usr" style="width:370px" placeholder="Nil">
                        <div class="edit" style="position:absolute;right:0px">
                          <span style="color: #227CBF;font-size: 12px;font-family: 'Inter';line-height: 14.4px;margin-right:20px;">Edit<i class="fas fa-thin fa-pen-to-square" style="color: #227cbf;margin-left:3px"></i></span><span style="color:#F00;font-size: 12px;font-family: 'Inter';line-height: 14.4px;">Delete<i class="fas fa-thin fa-trash-can" style="color: #f00;margin-left:3px"></i></span>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              </div>
            </div>
            <div class="add" style="margin-left:350px;position:absolute;top:885px"><span style="color:#47B65C;font-size: 12px;font-family: 'Inter';line-height: 14.4px;">Add<i class="fas fa-light fa-circle-plus" style="color: #47b65c;"></i></span></div>

          </div>
          <div class="transaction-parties mt-3">
            <div class="card" style="height:310px;width:405px">
              <div class="card-body">
                <div class="col-xl-12 col-lg-12">
                  <div class="ms-panel ms-panel-fh ms-facebook-engagements pb-3">
                    <div class="ms-panel-header">
                      <h6 class="fees">Performance Linked Indicators</h6>
                    </div>
                    <div class="amount d-flex justify-content-between">
                      <div class="form-group mt-2">
                        <label for="usr">Particulars</label>
                        <input type="text" class="form-control mt-1" id="usr" style="width:360px">
                      </div>

                    </div>
                    <div class="final d-flex justify-content-between">
                      <div class="form-group mt-2" style="position:relative;">
                        <label for="usr">Concerns</label>
                        <select class="form-select mt-1" aria-label="Default select example">
                          <option selected>Low</option>
                          <option value="1">Low</option>
                          <option value="2">Medium</option>
                          <option value="3">High</option>

                        </select>

                      </div>
                      <div class="form-group mt-2">
                        <label for="usr" style="margin-bottom:6px">Expected Date</label>
                        <input type="date" name="dateofbirth" id="dateofbirth" style="width:180px;height:37px;border-radius:5px;border:1px solid #ddd">

                      </div>
                    </div>
                    <div class="amount d-flex justify-content-between" style="position:relative;">
                      <div class="final d-flex justify-content-between">
                        <div class="form-group mt-2">
                          <label for="usr" style="margin-bottom:6px">Weight(%)</label>
                          <input type="text" class="form-control" id="usr" style="width:182px" placeholder="50">
                        </div>
                        <div class="form-group mt-2 mb-2">
                          <label for="usr" style="margin-left:10px;margin-bottom:6px">Status</label>
                          <input type="text" class="form-control" id="usr" style="width:182px;margin-left:10px" placeholder="Active">
                          <div class="edit" style="position:absolute;right:0px;margin-left:10px">
                            <span style="color: #227CBF;font-size: 12px;font-family: 'Inter';line-height: 14.4px;margin-right:10px">Edit<i class="fas fa-thin fa-pen-to-square" style="color: #227cbf;margin-left:3px"></i></span><span style="color:#F00;font-size: 12px;font-family: 'Inter';line-height: 14.4px;">Delete<i class="fas fa-thin fa-trash-can" style="color: #f00;margin-left:3px"></i></span>
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>
                  <div class="add mt-2" style="margin-left:335px;position:absolute;top:265px"><span style="color:#47B65C;font-size: 12px;font-family: 'Inter';line-height: 14.4px;">Add<i class="fas fa-light fa-circle-plus" style="color: #47b65c;margin-left:2px"></i></span></div>
                </div>
              </div>
            </div>

          </div>
          <div class="transaction-parties mt-3">
            <div class="card" style="height:310px;width:405px">
              <div class="card-body">
                <div class="col-xl-12 col-lg-12">
                  <div class="ms-panel ms-panel-fh ms-facebook-engagements pb-4">
                    <div class="ms-panel-header">
                      <h6 class="fees">Other Conditions Precedent</h6>
                    </div>
                    <div class="final d-flex justify-content-between">
                      <div class="form-group pt-1" style="position:relative;">
                        <label for="usr">Factors</label>

                        <input type="text" class="form-control" id="usr" placeholder="Pencom Compliance cert." style="width:180px;position:absolute;top:21px">

                      </div>
                      <div class="form-group pt-1">
                        <label for="usr" style="position:absolute;left:200px;">Yes/No</label>
                        <select class="form-select" aria-label="Default select example" style="position:absolute;top:70px;left:200px">
                          <option selected>No</option>
                          <option value="1">No</option>
                          <option value="2">Yes</option>

                        </select>
                      </div>
                    </div>
                    <div class="final d-flex justify-content-between mt-5">
                      <div class="form-group" style="position:relative;">
                        <label for="usr">Concerns</label>

                        <select class="form-select" aria-label="Default select example">
                          <option selected>Low</option>
                          <option value="1">Low</option>
                          <option value="2">Medium</option>
                          <option value="3">High</option>

                        </select>

                      </div>
                      <div class="form-group">
                        <label for="usr" style="margin-left:2px;margin-bottom:0px">Expected Date</label>
                        <input type="date" name="dateofbirth" id="dateofbirth" style="width:180px;margin-left:2px;height:37px;border-radius:5px;border:1px solid #ddd">

                      </div>
                    </div>
                    <div class="amount d-flex justify-content-between mt-3" style="position:relative;">
                      <div class="final d-flex justify-content-between">
                        <div class="form-group">
                          <label for="usr">Resp. Party</label>
                          <input type="text" class="form-control" id="usr" placeholder="LFZC" style="width:185px">
                        </div>
                        <div class="form-group mb-1">
                          <label for="usr" style="margin-left:10px">Status</label>
                          <input type="text" class="form-control" id="usr" placeholder="Active" style="width:185px;margin-left:5px">
                          <div class="edit mt-1" style="position:absolute;right:0px">
                            <span style="color: #227CBF;font-size: 12px;font-family: 'Inter';line-height: 14.4px;margin-right:10px">Edit<i class="fas fa-thin fa-pen-to-square" style="color: #227cbf;margin-left:3px"></i></span><span style="color:#F00;font-size: 12px;font-family: 'Inter';line-height: 14.4px;">Delete<i class="fas fa-thin fa-trash-can" style="color: #f00;margin-left:3px"></i></span>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                  <div class="add" style="margin-left:335px;position:absolute;top:265px"><span style="color:#47B65C;font-size: 12px;font-family: 'Inter';line-height: 14.4px;">Add<i class="fas fa-light fa-circle-plus" style="color: #47b65c;margin-left:2px"></i></span></div>
                </div>
              </div>
            </div>

          </div>
          <div class="transaction-parties mt-3">
            <div class="card" style="height:310px;width:405px">
              <div class="card-body">
                <div class="col-xl-12 col-lg-12">
                  <div class="ms-panel ms-panel-fh ms-facebook-engagements">
                    <div class="ms-panel-header">
                      <h6 class="fees">Key Deals Factors</h6>
                    </div>
                    <div class="final d-flex justify-content-between">
                      <div class="form-group pt-1" style="position:relative;">
                        <label for="usr">Factors</label>

                        <input type="text" class="form-control" id="usr" placeholder="Rick sharing with GuarantCo" style="width:180px;position:absolute;top:21px">

                      </div>
                      <div class="form-group pt-1">
                        <label for="usr" style="position:absolute;left:200px;">Yes/No</label>
                        <select class="form-select" aria-label="Default select example" style="position:absolute;top:70px;left:200px">
                          <option selected>No</option>
                          <option value="1">No</option>
                          <option value="2">Yes</option>

                        </select>
                      </div>
                    </div>
                    <div class="final d-flex justify-content-between mt-5">
                      <div class="form-group" style="position:relative;">
                        <label for="usr">Concerns</label>

                        <select class="form-select" aria-label="Default select example">
                          <option selected>Low</option>
                          <option value="1">Low</option>
                          <option value="2">Medium</option>
                          <option value="3">High</option>

                        </select>

                      </div>
                      <div class="form-group">
                        <label for="usr">Expected Date</label>
                        <input type="date" name="dateofbirth" id="dateofbirth" style="width:182px;margin-left:0px;height:39px;border-radius:5px;border:1px solid #ddd">

                      </div>
                    </div>
                    <div class="amount d-flex justify-content-between mt-3" style="position:relative;">
                      <div class="final d-flex justify-content-between">
                        <div class="form-group">
                          <label for="usr">Resp. Party</label>
                          <input type="text" class="form-control" id="usr" placeholder="LFZC" style="width:185px">
                        </div>
                        <div class="form-group mb-3">
                          <label for="usr" style="margin-left:10px">Status</label>
                          <input type="text" class="form-control" id="usr" placeholder="Active" style="width:180px;margin-left:5px">
                          <div class="edit mb-1" style="position:absolute;right:0px;">
                            <span style="color: #227CBF;font-size: 12px;font-family: 'Inter';line-height: 14.4px;margin-right:10px">Edit<i class="fas fa-thin fa-pen-to-square" style="color: #227cbf;margin-left:3px"></i></span><span style="color:#F00;font-size: 12px;font-family: 'Inter';line-height: 14.4px;">Delete<i class="fas fa-thin fa-trash-can" style="color: #f00;margin-left:3px"></i></span>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                  <div class="add" style="margin-left:330px;position:absolute;top:265px"><span style="color:#47B65C;font-size: 12px;font-family: 'Inter';line-height: 14.4px;">Add<i class="fas fa-light fa-circle-plus" style="color: #47b65c;margin-left:2px"></i></span></div>
                </div>
              </div>
            </div>

          </div>
          <div class="transaction-parties mt-3">
            <div class="card" style="height:310px;width:405px">
              <div class="card-body">
                <div class="col-xl-12 col-lg-12">
                  <div class="ms-panel ms-panel-fh ms-facebook-engagements pb-4">
                    <div class="ms-panel-header">
                      <h6 class="fees">Amortization</h6>
                    </div>
                    <div class="final d-flex justify-content-between mt-2">
                      <div class="form-group" style="position:relative;">
                        <label for="usr" style="margin-bottom:5px">* DiscountFactor</label>

                        <input type="text" class="form-control" id="usr" style="width:180px;position:absolute;top:16px">

                      </div>
                      <div class="form-group" style="position:relative;">
                        <label for="usr" style="margin-bottom:5px;margin-right:50px">* TakingFirstInterestEarly</label>
                        <select class="form-select" aria-label="Default select example" style="position:absolute;right:1px;top:16px;">
                          <option selected>No</option>
                          <option value="1">No</option>
                          <option value="2">Yes</option>

                        </select>
                      </div>
                    </div>
                    <div class="final d-flex justify-content-between mt-5">
                      <div class="form-group" style="position:relative;">
                        <label for="usr">* GuaranteeFeeRate</label>

                        <input type="text" class="form-control" id="usr" style="width:182px">

                      </div>
                      <div class="form-group">
                        <label for="usr" style="margin-left:2px">Status</label>
                        <input type="text" class="form-control" id="usr" placeholder="Active" style="width:182px;">

                      </div>
                    </div>
                    <div class="amount d-flex justify-content-between mt-3" style="position:relative;">
                      <div class="final d-flex justify-content-between">
                        <div class="form-group">
                          <label for="usr">* FirstCouponDate</label>
                          <input type="date" name="dateofbirth" id="dateofbirth" style="width:182px;height:37px;border-radius:5px;border:1px solid #ddd">

                        </div>
                        <div class="form-group">
                          <label for="usr" style="margin-left:10px">* IssueDate</label>
                          <input type="date" name="dateofbirth" id="dateofbirth" style="width:182px;height:37px;border-radius:5px;border:1px solid #ddd;margin-left:5px">

                          <div class="edit" style="position:absolute;right:0px">
                            <span style="color: #227CBF;font-size: 12px;font-family: 'Inter';line-height: 14.4px;margin-right:10px">Edit<i class="fas fa-thin fa-pen-to-square" style="color: #227cbf;margin-left:3px"></i></span><span style="color:#F00;font-size: 12px;font-family: 'Inter';line-height: 14.4px;">Delete<i class="fas fa-thin fa-trash-can" style="color: #f00;margin-left:3px"></i></span>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                  <div class="add" style="margin-left:330px;position:absolute;top:265px"><span style="color:#47B65C;font-size: 12px;font-family: 'Inter';line-height: 14.4px;">Add<i class="fas fa-light fa-circle-plus" style="color: #47b65c;margin-left:2px"></i></span></div>
                </div>
              </div>
            </div>

          </div>
          <div class="btn-group d-flex mt-4 float-end">

            <button class="back ml-3">Back</button>

            <button class="save ml-2">Save Changes</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  height: 220vh;
  margin: auto;
  margin-top: 120px;
  margin-left: 10px;
}

.card-body {
  box-shadow: 0 1px 6px 1px rgba(69, 65, 78, 0.1);
  box-sizing: border-box;
}

.ms-panel-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.red h5 {
  font-size: 16px;
  font-family: 'Inter';
  line-height: 19.2px;
  color: #f00;
}

.amber h5 {
  color: #ffbf1a;
  font-size: 16px;
  font-family: 'Inter';
  line-height: 19.2px;
}

.green h5 {
  color: #47b65c;
  font-size: 16px;
  font-family: 'Inter';
  line-height: 19.2px;
}

.red h6,
.amber h6,
.green h6 {
  font-size: 12px;
  font-family: 'Inter';
  line-height: 14.4px;
}

.ms-panel-header h4 {
  font-size: 20px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 24px;
}

.r-requirement {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 13px;
  align-self: stretch;
}

.ms-panel {
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

input::placeholder {
  font-weight: bold;
  font-size: 12px;
  color: black;
}

.input-btn input::placeholder {
  margin-left: 10px;
  color: #9f9d9d;
}

.form {
  display: flex;
}

.form input {
  width: 200px;
}
.form button {
  width: 50px;
}

.form button .fa-chevron-right {
  transform: rotate(0deg);
  transition: all 0.6s;
}

.form button .fa-chevron-right .active {
  transform: rotate(90deg);
}

.update-wrap {
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.picsdate img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
}

.updates {
  position: relative;
}

.dots {
  height: 10px;
  width: 10px;
  background-color: #47b65c;
  border-radius: 50%;
  position: absolute;
  left: 20px;
  top: 20px;
}

.dot {
  height: 10px;
  width: 10px;
  background-color: #47b65c;
  border-radius: 50%;
  position: absolute;
  left: 20px;
  top: 20px;
}

.posts {
  margin-left: 10px;
  height: 45px;
  border-radius: 0px 8px 8px 8px;
  background: var(--white, #fff);
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 10px 14px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1 0 085;
}

.posts h6 {
  margin-left: 10px;
  font-size: 12px;
  font-weight: bold;
}

.switchToggle input[type="checkbox"],
.switchToggle1 input[type="checkbox"],
.switchToggle2 input[type="checkbox"],
.switchToggle3 input[type="checkbox"],
.switchToggle4 input[type="checkbox"],
.switchToggle5 input[type="checkbox"],
.switchToggle6 input[type="checkbox"],
.switchToggle7 input[type="checkbox"],
.switchToggle8 input[type="checkbox"],
.switchToggle9 input[type="checkbox"],
.switchToggle10 input[type="checkbox"],
.switchToggle11 input[type="checkbox"],
.switchToggle12 input[type="checkbox"],
.switchToggle13 input[type="checkbox"],
.switchToggle14 input[type="checkbox"] {
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;
}
.switchToggle label,
.switchToggle1 label,
.switchToggle2 label,
.switchToggle3 label,
.switchToggle4 label,
.switchToggle5 label,
.switchToggle6 label,
.switchToggle7 label,
.switchToggle8 label,
.switchToggle9 label,
.switchToggle10 label,
.switchToggle11 label,
.switchToggle12 label,
.switchToggle13 label,
.switchToggle14 label,
.switchToggle15 label {
  cursor: pointer;
  text-indent: -9999px;
  width: 45px;
  max-width: 70px;
  height: 22px;
  background: #fff;
  display: block;
  border-radius: 100px;
  position: relative;
  border: 1px solid#227cbf;
}

.switchToggle label:after,
.switchToggle1 label:after,
.switchToggle2 label:after,
.switchToggle3 label:after,
.switchToggle4 label:after,
.switchToggle5 label:after,
.switchToggle6 label:after,
.switchToggle7 label:after,
.switchToggle8 label:after,
.switchToggle9 label:after,
.switchToggle10 label:after,
.switchToggle11 label:after,
.switchToggle12 label:after,
.switchToggle13 label:after,
.switchToggle14 label:after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 15px;
  height: 17px;
  background: #227cbf;
  border-radius: 90px;
  transition: 0.3s;
}

.switchToggle label:checked,
.switchToggle1 label:checked,
.switchToggle2 label:checked,
.switchToggle3 label:checked,
.switchToggle4 label:checked,
.switchToggle5 label:checked,
.switchToggle6 label:checked,
.switchToggle7 label:checked,
.switchToggle8 label:checked,
.switchToggle9 label:checked,
.switchToggle10 label:checked,
.switchToggle11 label:checked,
.switchToggle12 label:checked,
.switchToggle13 label:checked,
.switchToggle14 label:checked {
  background-color: #27a1ca;
}

.switchToggle input:checked + label,
.switchToggle input:checked + input + label,
.switchToggle1 input:checked + label,
.switchToggle1 input:checked + input + label,
.switchToggle2 input:checked + label,
.switchToggle2 input:checked + input + label,
.switchToggle3 input:checked + label,
.switchToggle3 input:checked + input + label,
.switchToggle4 input:checked + label,
.switchToggle4 input:checked + input + label,
.switchToggle5 input:checked + label,
.switchToggle5 input:checked + input + label,
.switchToggle6 input:checked + label,
.switchToggle6 input:checked + input + label,
.switchToggle7 input:checked + label,
.switchToggle7 input:checked + input + label,
.switchToggle8 input:checked + label,
.switchToggle8 input:checked + input + label,
.switchToggle9 input:checked + label,
.switchToggle9 input:checked + input + label,
.switchToggle10 input:checked + label,
.switchToggle10 input:checked + input + label,
.switchToggle11 input:checked + label,
.switchToggle11 input:checked + input + label,
.switchToggle12 input:checked + label,
.switchToggle12 input:checked + input + label,
.switchToggle13 input:checked + label,
.switchToggle13 input:checked + input + label,
.switchToggle14 input:checked + label,
.switchToggle14 input:checked + input + label {
  background: #3e98d3;
}

.switchToggle input + label:before,
.switchToggle input + input + label:before,
.switchToggle1 input + label:before,
.switchToggle1 input + input + label:before,
.switchToggle2 input + label:before,
.switchToggle2 input + input + label:before,
.switchToggle3 input + label:before,
.switchToggle3 input + input + label:before,
.switchToggle4 input + label:before,
.switchToggle4 input + input + label:before,
.switchToggle5 input + label:before,
.switchToggle5 input + input + label:before,
.switchToggle6 input + label:before,
.switchToggle6 input + input + label:before,
.switchToggle7 input + label:before,
.switchToggle7 input + input + label:before,
.switchToggle8 input + label:before,
.switchToggle8 input + input + label:before,
.switchToggle9 input + label:before,
.switchToggle9 input + input + label:before,
.switchToggle10 input + label:before,
.switchToggle10 input + input + label:before,
.switchToggle11 input + label:before,
.switchToggle11 input + input + label:before,
.switchToggle12 input + label:before,
.switchToggle12 input + input + label:before,
.switchToggle13 input + label:before,
.switchToggle13 input + input + label:before,
.switchToggle14 input + label:before,
.switchToggle14 input + input + label:before {
  content: "No";
  position: absolute;
  top: 0px;
  left: 20px;
  width: 26px;
  height: 26px;
  border-radius: 90px;
  transition: 0.3s;
  text-indent: 0;
  color: #227cbf;
  font-size: 12px;
}

.switchToggle input:checked + label:before,
.switchToggle input:checked + input + label:before,
.switchToggle1 input:checked + label:before,
.switchToggle1 input:checked + input + label:before,
.switchToggle2 input:checked + label:before,
.switchToggle2 input:checked + input + label:before,
.switchToggle3 input:checked + label:before,
.switchToggle3 input:checked + input + label:before,
.switchToggle4 input:checked + label:before,
.switchToggle4 input:checked + input + label:before,
.switchToggle5 input:checked + label:before,
.switchToggle5 input:checked + input + label:before,
.switchToggle6 input:checked + label:before,
.switchToggle6 input:checked + input + label:before,
.switchToggle7 input:checked + label:before,
.switchToggle7 input:checked + input + label:before,
.switchToggle8 input:checked + label:before,
.switchToggle8 input:checked + input + label:before,
.switchToggle9 input:checked + label:before,
.switchToggle9 input:checked + input + label:before,
.switchToggle10 input:checked + label:before,
.switchToggle10 input:checked + input + label:before,
.switchToggle11 input:checked + label:before,
.switchToggle11 input:checked + input + label:before,
.switchToggle12 input:checked + label:before,
.switchToggle12 input:checked + input + label:before,
.switchToggle13 input:checked + label:before,
.switchToggle13 input:checked + input + label:before,
.switchToggle14 input:checked + label:before,
.switchToggle14 input:checked + input + label:before {
  content: "Yes";
  position: absolute;
  top: 0px;
  left: 5px;
  width: 26px;
  height: 26px;
  border-radius: 90px;
  transition: 0.3s;
  text-indent: 0;
  color: #fff;
}
.switchToggle input:checked + label:after,
.switchToggle input:checked + input + label:after,
.switchToggle1 input:checked + label:after,
.switchToggle1 input:checked + input + label:after,
.switchToggle2 input:checked + label:after,
.switchToggle2 input:checked + input + label:after,
.switchToggle3 input:checked + label:after,
.switchToggle3 input:checked + input + label:after,
.switchToggle4 input:checked + label:after,
.switchToggle4 input:checked + input + label:after,
.switchToggle5 input:checked + label:after,
.switchToggle5 input:checked + input + label:after,
.switchToggle6 input:checked + label:after,
.switchToggle6 input:checked + input + label:after,
.switchToggle7 input:checked + label:after,
.switchToggle7 input:checked + input + label:after,
.switchToggle8 input:checked + label:after,
.switchToggle8 input:checked + input + label:after,
.switchToggle9 input:checked + label:after,
.switchToggle9 input:checked + input + label:after,
.switchToggle10 input:checked + label:after,
.switchToggle10 input:checked + input + label:after,
.switchToggle11 input:checked + label:after,
.switchToggle11 input:checked + input + label:after,
.switchToggle12 input:checked + label:after,
.switchToggle12 input:checked + input + label:after,
.switchToggle13 input:checked + label:after,
.switchToggle13 input:checked + input + label:after,
.switchToggle14 input:checked + label:after,
.switchToggle14 input:checked + input + label:after {
  left: calc(100% - 2px);
  transform: translateX(-100%);
}

.switchToggle label:active:after,
.switchToggle1 label:active:after,
.switchToggle2 label:active:after,
.switchToggle3 label:active:after,
.switchToggle4 label:active:after,
.switchToggle5 label:active:after,
.switchToggle6 label:active:after,
.switchToggle7 label:active:after,
.switchToggle8 label:active:after,
.switchToggle9 label:active:after,
.switchToggle10 label:active:after,
.switchToggle11 label:active:after,
.switchToggle12 label:active:after,
.switchToggle13 label:active:after,
.switchToggle14 label:active:after {
  width: 60px;
}

.toggle-switchArea {
  margin: 10px 0 10px 0;
}

.fees {
  color: #000;
  font-size: 20px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 24px;
}

.form-group label {
  color: #000;
  font-size: 12px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 14.4px;
}

.back {
  display: flex;
  width: 150px;
  height: 35px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  border: 1px solid var(--primary, #227cbf);
  background: var(--white, #fff);
  color: var(--primary, #227cbf);
  font-size: 16px;
  font-family: 'Inter';
  line-height: 19.2px;
}

.save {
  display: flex;
  width: 150px;
  height: 35px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  background: var(--gradient, linear-gradient(90deg, #227cbf 0%, #47b65c 100%));
  border: none;
  color: #fff;
}

.back:hover {
  background: #44b165;
  transition: 0.7s;
  color: #fff;
}

.save:hover {
  background: linear-gradient(90deg, #47b65c 0%, #227cbf 100%);
  transition: 0.7s;
}

.r-custom-select,
.l-custom-select {
  position: relative;
  width: 175px;
  margin-right: 1rem;
  border: 0px;
}

.l-custom-select[open] {
  z-index: 1;
}

.l-radios {
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

.l-radios::-webkit-details-marker {
  display: none;
}

.l-custom-select[open] .l-radios:before {
  content: "";
  display: block;
  width: 100vw;
  height: 100vh;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
}

.l-radios:after {
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

.l-radios:focus {
  outline: none;
}

.l-custom-select[open] .l-radios:after {
  transform: rotate(-45deg) translate(0%, 0%);
}

.l-list {
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

.l-list li {
  margin: 0;
  padding: 0.3rem 0;
}

.l-list li:first-child {
  padding-top: 0;
}

.l-list li:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

/* FAKE SELECT */

summary.l-radios {
  counter-reset: radios;
}

summary.l-radios:before {
  content: var(--selection);
}

input[class="led"] {
  counter-increment: radios;
  appearance: none;
  display: none;
}

input[class="led"]:checked {
  display: inline;
  --display: block;
  position: absolute;
  top: 6px;
}

input[class="led"]:after {
  content: attr(title);
  display: inline;
  font-size: 1rem;
}

ul.l-list {
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

/* Custom styles for the select element */
.custom-select {
  width: 185px;
}

.radios {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  width: 185px;
}

/* Style the labels as list items */
.list li label {
  cursor: pointer;
}

.select-menu.active .options {
  display: block;
}

.select-menu.active .select-btn i {
  transform: rotate(-180deg);
}

.select-btn i {
  transition: 0.3s;
}

.options .option:hover {
  background: #f2f2f2;
}

.wrapper {
  width: 185px;
  height: 40px;
  margin: 0px auto 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.select-btn,
.options li {
  display: flex;
  cursor: pointer;
  align-items: center;
}

.select-btn {
  height: 65px;
  font-size: 22px;
  padding: 0 20px;
  border-radius: 7px;
  background: #fff;

  justify-content: space-between;
}

.select-btn i {
  font-size: 31px;
  transition: transform 0.3s linear;
}

.wrapper.active .select-btn1 i {
  transform: rotate(270deg);
}

.content {
  display: none;
  padding: 20px;
  margin-top: 15px;
  border-radius: 7px;
  background: #fff;
}

.wrapper.active .content {
  display: block;
}

.content .options {
  margin-top: 10px;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 7px;
}

.options::-webkit-scrollbar {
  width: 7px;
}

.options::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 25px;
}

.options::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 25px;
}

.options li {
  height: 50px;
  padding: 0 13px;
  font-size: 21px;
  border-radius: 5px;
}

.options li:hover,
li.selected {
  background: #f2f2f2;
}

.form-select {
  width: 185px;
}
</style>