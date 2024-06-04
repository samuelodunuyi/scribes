<script setup>
import TableThree from '../../components/Tables/TableThree.vue';
import ToolBar from '../../components/ToolBar.vue';
import TabMenu from '../../components/TabMenu.vue';
import ReportSubMenu from '../../components/ReportSubMenu.vue';
import PieChartDeal from '../../components/Charts/PieChartDeal.vue';
</script>
<template>
    <div style="margin: 0px 50px;">
        <div class="wrapper">
            <TabMenu />
            <div class="intro mt-4 ">
                <h3> Report </h3>
                <ReportSubMenu />
            </div>
        </div>
        <div style="height: 400px; background-color: white; margin-bottom: 20px;">
            <div class="chart-box-3 box-padded">
                <h4 class="box-title"> Deal Category </h4>
                <PieChartDeal chart-id="dealcategory" :doughnut="true" />
            </div>
        </div>
        <div style="margin-bottom: 10px">
            <ToolBar></ToolBar>
        </div>
        <TableThree></TableThree>
    </div>
</template>
<style scope>
.chart-box-3 {
    width: 27%;
    align-items: center;
    margin: 0px auto;
    text-align: center;
    padding: 20px 0px;
}
</style>