<script setup>
    import { ref } from 'vue';
import Toggle from '../../src/components/Toggle.vue';

// const NDARequired = ref(false)
// const NDAExecuted = ref(true)
</script>
<template>
  <div class="container">
    <div class="card">
      <div class="title">
        <h4>Checklist</h4>
      </div>
      <!-- {{ NDARequired }}
      {{ NDAExecuted }} -->
      <div class="d-flex flex-column gap-3">
        <div class="form-group d-flex justify-content-between align-items-center">
          <span> NDA Required </span>

          <Toggle v-model:model-value="NDARequired" />
        </div>
        <div class="form-group d-flex justify-content-between align-items-center">
          <span> NDA Sent? </span>

          <Toggle v-model:model-value="NDAExecuted" />
        </div>
        <div class="form-group d-flex justify-content-between align-items-center">
          <span> PIC/PID Sent? </span>

          <Toggle v-model:model-value="NDAExecuted" />
        </div>
        <div class="form-group d-flex justify-content-between align-items-center">
          <span> PIC/PID Executed? </span>

          <Toggle v-model:model-value="NDAExecuted" />
        </div>
        <div class="form-group d-flex justify-content-between align-items-center">
          <span> NDA Executed? </span>

          <Toggle />
        </div>
        <div class="form-group d-flex justify-content-between align-items-center">
          <span> Project Viability </span>

          <Toggle />
        </div>
        <div class="form-group d-flex justify-content-between align-items-center">
          <span> Commence Initial KYC </span>

          <Toggle />
        </div>
        <div class="form-group d-flex justify-content-between align-items-center">
          <span> E & S Assessment Commmenced </span>

          <Toggle />
        </div>
        <div class="form-group d-flex justify-content-between align-items-center">
          <span> Outcome of E&S and
            initial KYC assessment Updated? </span>

          <Toggle />
        </div>

        <div class="form-group d-flex justify-content-between align-items-center">
          <span> MROC Approval </span>

          <Toggle />
        </div>
        <div class="form-group d-flex justify-content-between align-items-center">
          <span> Draft NBC Paper Sent? </span>

          <Toggle />
        </div>
        <div class="form-group d-flex justify-content-between align-items-center">
          <span> Draft Mandate Letter Sent? </span>

          <Toggle />
        </div>
        <div class="form-group d-flex justify-content-between align-items-center">
          <span> NBC Approved? </span>

          <Toggle />
        </div>
        <div class="form-group d-flex justify-content-between align-items-center">
          <span> NBC Number </span>

          <Toggle />
        </div>

        <div class="form-group d-flex justify-content-between align-items-center">
          <span> Mandate Signed? </span>

          <!-- <div class="form-check form-check-inline form-switch">
            <input class="form-check-input" type="checkbox">
          </div> -->
          <Toggle />
        </div>

      </div>
    </div>
  </div>
</template>



<style scoped>
.card {
  display: flex;
  width: 620px;
  height: 567px;
  padding: 10px 15px 20px 15px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  border-radius: 5px;
  border: 0.885px solid var(--gray-200, #e4e4e7);
  background: var(--color-3, #fff);
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);
}
.title {
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
input[type="checkbox"] {
  accent-color: blue;
}
.form-group {
  width: 590px;
  height: 22px;
}
.form-group span:first-child {
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  max-width: 180px;
}
input,
select {
  padding: 10px 20px 10px 10px;
  align-items: center;

  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
}
.form-check-input {
  width: 45px;
  height: 22px;
}
span {
  color: var(--black, #000);
  font-family: 'Inter';
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14.4px;
}
</style>