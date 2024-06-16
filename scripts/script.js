//Getting input fields
const carTypeField = document.getElementById("car_type");
const leasePeriodField = document.getElementById("lease")
const carValueSlider = document.getElementById("c_value");
const carValueTxtField = document.getElementById("car_value");
const downPaymentSlider = document.getElementById("d_payment");
const downPaymentTxtField = document.getElementById("down_payment");

// Getting result fields
const totalCostField = document.getElementById("total_cost");
const downPaymentCostField = document.getElementById("down_payment_cost");
const monthlyInstallmentCostField = document.getElementById("monthly_installment");
const interestRateCostField = document.getElementById("interest_rate");

calculateLeasingDetails();

//Getting form element to listen for any input
const formContainer = document.getElementsByClassName("form_container")[0];

//Refreshing all values on input
refreshInfo();

function refreshInfo() {
    formContainer.addEventListener("input", event => {
        calculateLeasingDetails();
    });

    carValue();
    downPayment();
}

function carValue() {
    carValueSlider.addEventListener("input", event => {
        carValueTxtField.value = carValueSlider.value;
    });

    carValueTxtField.addEventListener("input", event => {
        if (carValueTxtField.value > 200000) {
            carValueTxtField.value = 200000;
        }

        carValueSlider.value = carValueTxtField.value;
    });
}

function downPayment() {
    downPaymentSlider.addEventListener("input", event => {
        downPaymentTxtField.value = downPaymentSlider.value;
    });
}

function calculateLeasingDetails() {
    let interestRate = calculateInterestRate();
    let downPayment = carValueSlider.value * downPaymentSlider.value / 100.0;
    let carValueAfterDownPayment = carValueSlider.value - downPayment;
    let moneyFactor = interestRate / 2400;

    let monthlyInstallment = carValueAfterDownPayment / leasePeriodField.value + carValueAfterDownPayment * moneyFactor;

    let total = monthlyInstallment * leasePeriodField.value + downPayment;

    downPaymentCostField.innerHTML = `Down Payment: €${downPayment.toFixed(2)}`;
    monthlyInstallmentCostField.innerHTML = `Monthly installment: €${monthlyInstallment.toFixed(2)}`;
    interestRateCostField.innerHTML = `Interest rate: ${interestRate}%`;
    totalCostField.innerHTML = `Total Leasing Cost: €${total.toFixed(2)}`;
}

function calculateInterestRate() {
    if (carTypeField.value === 'Brand New') {
        return 2.99;
    }
    return 3.7;
}
