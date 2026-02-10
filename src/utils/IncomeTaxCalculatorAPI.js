const incomeTaxCalculatorAPI = (data) => {
    return 'https://api.api-ninjas.com/v1/incometaxcalculator?country=' + 'US' + '&region=' + data.region + '&income=' + data.income + '&filing_status=' + data.filing_status + '&tax_year=' + '2026';
};

function checkRes(res){
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
}

function getTaxes(data){
    return fetch(incomeTaxCalculatorAPI(data), {
        method: "GET",
        headers: { 
            'X-Api-Key': 'PfMBN3HflvOOIAWQRRBvCD8TehUmw39IdNA8sksp',
        },
        contentType: 'application/json'
    }).then((res) => {
        return checkRes(res);
    }).catch(() => {
        console.error("Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.");
    });
};

export default getTaxes;