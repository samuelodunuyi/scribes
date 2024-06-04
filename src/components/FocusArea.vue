<template>
  <div class="col-8" style="height:474px;width:895px">
    <div class="card pb-3" style="height:494px;width:846px">
      <div class="card-body">
        <div class="col-xl-12 col-lg-12">
          <div class="ms-panel ms-panel-fh ms-facebook-engagements" style="height:190px">
            <div class="ms-panel-header">
              <h6 style="color: #000;font-size: 20px;font-family: 'Inter';font-style: normal;font-weight: 600;line-height: 24px;">NBC Focus Areas</h6>
            </div>
            <div class="form-row mt-3 d-flex justify-content-around">
              <div class="col-6">
                <label for="industry" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">Original</label>
                <input type="text" class="form-control" id="original" placeholder="Revalidation of revenue and projections">
              </div>
              <div class="col-6">
                <label for="products" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">METHODOLOGY</label>
                <input type="text" class="form-control" id="products" placeholder="Nil">
              </div>

            </div>
            <div class="form-row mt-3 d-flex" style="width:380px">
              <div class="col">
                <label for="industry" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;margin-left:5px">Concerns</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select</option>
                  <option value="1">No</option>
                  <option value="2">Yes</option>

                </select>

              </div>
              <div class="col" style="">
                <label for="products" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">Date</label>
                <input type="date" name="dateofbirth" id="dateofbirth" style="width:170px;height:37px;border-radius:5px;border:1px solid #ddd">
              </div>
              <div class="edit mb-2" style="position:absolute;top:180px;right:20px">
                <span style="color: #227CBF;font-size: 12px;font-family: 'Inter';line-height: 14.4px;margin-right:10px">Edit<i class="fas fa-thin fa-pen-to-square" style="color: #227cbf;margin-left:3px"></i></span><span style="color:#F00;font-size: 12px;font-family: 'Inter';line-height: 14.4px;">Delete<i class="fas fa-thin fa-trash-can" style="color: #f00;margin-left:3px"></i></span>
              </div>
            </div>

          </div>

        </div>
        <div class="add" style="right:20px;position:absolute;top:210px"><span style="color:#47B65C;font-size: 12px;font-family: 'Inter';line-height: 14.4px;">Add<i class="fas fa-light fa-circle-plus" style="color: #47b65c;"></i></span></div>
        <div class="col-xl-12 col-lg-12 mt-4">
          <h2 style="color: var(--black, #000);font-size: 16px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 19.2px;">NBC Paper(Link to Doc)</h2>
          <div class="form-row mt-1 d-flex justify-content-around">
            <div class="col-3">
              <label for="industry" style="color: var(--black, #000);font-size: 11.3px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">MROC Pre_NBC Approval(Link Doc)</label>
              <input type="text" class="form-control" id="industry" placeholder="Here">
            </div>
            <div class="col-3">
              <label for="products" style="color: var(--black, #fff);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">H</label>
              <input type="date" name="dateofbirth" id="dateofbirth" style="width:180px;height:37px;border-radius:5px;border:1px solid #ddd">
            </div>
            <div class="col-3">
              <label for="industry" style="color: var(--black, #000);font-size: 11.3px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">MROC Pre_NBC Minutes.(Link Doc)</label>
              <input type="text" class="form-control" id="industry" placeholder="Here">
            </div>
            <div class="col-3">
              <label for="dealSize" style="color: var(--black, #fff);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">R</label>
              <input type="date" name="dateofbirth" id="dateofbirth" style="width:180px;height:37px;border-radius:5px;border:1px solid #ddd">
            </div>
          </div>
          <div class="form-row mt-3 d-flex justify-content-around">
            <div class="col-3">
              <label for="industry" style="color: var(--black, #000);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">NBC Approval(Link Doc)</label>
              <input type="text" class="form-control" id="industry" placeholder="Here">
            </div>
            <div class="col-3">
              <label for="products" style="color: var(--black, #fff);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">H</label>
              <input type="date" name="dateofbirth" id="dateofbirth" style="width:180px;height:37px;border-radius:5px;border:1px solid #ddd">
            </div>
            <div class="col-3">
              <label for="industry" style="color: var(--black, #000);font-size: 11.5px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">NBC Minutes.(Link Doc)</label>
              <input type="text" class="form-control" id="industry" placeholder="Here">
            </div>
            <div class="col-3">
              <label for="dealSize" style="color: var(--black, #fff);font-size: 12px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">R</label>
              <input type="date" name="dateofbirth" id="dateofbirth" style="width:180px;height:37px;border-radius:5px;border:1px solid #ddd">
            </div>
          </div>
          <div class="form-row mt-3 d-flex" style="width:380px">
            <div class="col ml-3">
              <label for="industry" style="color: var(--black, #000);font-size: 10.5px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">Mandate Letter with Indicative Term </label>
              <input type="text" class="form-control" id="industry" placeholder="Here">
            </div>
            <div class="col ml-2" style="">
              <label for="products" style="color: var(--black, #000);font-size: 10.5px;font-family: 'Inter';font-style: normal;font-weight: 700;line-height: 14.4px;">Sheet On-Boarding Documents</label>
              <input type="date" name="dateofbirth" id="dateofbirth" style="width:188px;height:37px;border-radius:5px;border:1px solid #ddd">
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.col-6 {
  width: 400px;
}

.col-3 {
  width: 180px;
}

.ms-panel-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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

.form-select {
  width: 180px;
}
</style>