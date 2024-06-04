<script setup>

</script>   

<template> 
    <div class="MainHead">
        <div class="wrap d-flex">
            <div class="topItems">
                <div class="tabmenu">
                    <ul class="nav justify-content-start">
                        <li class="nav-item">
                            <RouterLink class="inactive" to="/report" active-class="nav-active">General Transaction Status
                                Report</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="inactive" to="/originationstructuringreport" active-class="nav-active">
                                Origination and Structuring
                                Activity Report</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="inactive" to="/originationprospectreport" active-class="nav-active">
                                Origination and Structuring
                                Prospect Report</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="inactive" to="/keystatistics" active-class="nav-active">
                                Key Statistics on Origination <br>and Structuring Activity</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="inactive" to="/originationactivity" active-class="nav-active">
                                Origination
                                Activity</RouterLink>
                        </li>
                    </ul>

                </div>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    name: 'PageMenuHeader',

};

</script>

<style scoped>
.MainHead {
    width: 100%;
}

.inactive {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    font-family: 'Inter';
    text-decoration: none;
    color: black;
}

.nav-active {
    color: #227cbf;
    cursor: default;
    border-bottom: 4px solid #227cbf;
}

.tabmenu {
    width: 100%;
    margin-bottom: 15px;
    height: 44px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 40px;
}

.topItems {
    margin-top: 10px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    width: 100%;
    color: black;
    height: 52px;
    border-bottom: 0.5px solid #808080;
}

li {
    width: 240px;
}
</style>
