const carTypeField = document.getElementById("car_type");
const leasePeriodField = document.getElementById("lease")

const carValueSlider = document.getElementById("c_value");
const carValueTxtField = document.getElementById("car_value");
carValue();

const downPaymentSlider = document.getElementById("d_payment");
const downPaymentTxtField = document.getElementById("down_payment");
downPayment();

const totalCostField = document.getElementById("total_cost");
const downPaymentCostField = document.getElementById("down_payment_cost");
const monthlyInstallmentCostField = document.getElementById("monthly_installment");
const interestRateCostField = document.getElementById("interest_rate");

calculateLeasingDetails();

const formContainer = document.getElementById("form_container");
refresh();

function refresh() {
    formContainer.addEventListener("click", e => {
        e.preventDefault();
        calculateLeasingDetails();
    });
}

function carValue() {
    carValueSlider.addEventListener("input", e => {
        e.preventDefault();
        carValueTxtField.value = carValueSlider.value;
        calculateLeasingDetails();
    });
    carValueTxtField.addEventListener("input", e => {
        e.preventDefault();
        carValueSlider.value = carValueTxtField.value;
        calculateLeasingDetails();
    });
}

function downPayment() {
    downPaymentSlider.addEventListener("input", e => {
        e.preventDefault();
        downPaymentTxtField.value = downPaymentSlider.value;
        calculateLeasingDetails()
    });
}

function calculateLeasingDetails() {
    let downPayment = carValueSlider.value * downPaymentSlider.value / 100;
    let interestRate = calculateInterestRate();
    let total = Number(carValueSlider.value - downPayment) + (carValueSlider.value * interestRate[1] / 100.0);
    let installment = total / leasePeriodField.value;

    downPaymentCostField.innerHTML = `Down Payment: €${downPayment.toFixed(2)}`;
    monthlyInstallmentCostField.innerHTML = `Monthly installment: €${installment.toFixed(2)}`;
    interestRateCostField.innerHTML = `Interest rate: ${interestRate[0]}%`;
    totalCostField.innerHTML = `Total Leasing Cost: €${total.toFixed(2)}`;
}

function calculateInterestRate() {
    if (carTypeField.value === 'Brand New') {
        return [2.99, Math.pow(1 + (2.99 / leasePeriodField.value), leasePeriodField.value) - 1];
    }
    return [3.7, Math.pow(1 + (3.7 / leasePeriodField.value), leasePeriodField.value) - 1];
}
