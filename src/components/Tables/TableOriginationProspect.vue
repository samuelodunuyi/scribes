<template>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span> S/N </span>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span> Infrastructure Entity </span>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span> Infrastructure Activity </span>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span> Brief Description </span>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span> Size(N'b) </span>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span>NBC/Mandate Status </span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>NSP</td>
                    <td>Power (On-Grid)</td>
                    <td>*An existing portfolio company of InfraCredit looking to hybridize its existing power plant by
                        incorporating up to 300MW of solar panel</td>
                    <td>*N5.0 </td>
                    <td>*Awaiting NBC Approval</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>ASB ValiantA</td>
                    <td>Power (Off-Grid)</td>
                    <td>*An EPC services company looking construct a dual fuel power plant for Afe Babalola University, Ado
                        Ekiti.</td>
                    <td>*N3.0 </td>
                    <td>*Awaiting NBC Approval</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Terra Aqua</td>
                    <td>Power (Off-Grid)</td>
                    <td>*An EPC services company looking construct a dual fuel power plant for Afe Babalola University, Ado
                        Ekiti.</td>
                    <td>*N10.0 </td>
                    <td>*Pre-NBC assessment</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>GigaGas</td>
                    <td>Gas Processing</td>
                    <td>*An indigenous midstream gas exploration and
                        processing Company looking to raise NGN3 billion to finance the second phase of a gas processing
                        project</td>
                    <td>*N10.0 </td>
                    <td>*Pre-NBC assessment</td>
                </tr>
            </tbody>

        </table>
    </div>
</template>

<style scoped>
thead tr th {
    font-size: 12px;
    font-weight: 600;
    line-height: 14.4px;
    padding: 15px;
}

tbody tr td {
    color: var(--grey-dark, #808080);
    /* Caption */
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    padding: 20px 15px;
    cursor: pointer;
}

thead,
tr {
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

tr:hover {
    background: #4b4a4a;
    background-color: rgba(0, 0, 0, 0.1);
}

.noshrink {
    display: flex;
    flex-shrink: 0;
}
</style>