document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const billAmountInput = document.getElementById('bill-amount');
    const tipButtons = document.querySelectorAll('.tip');
    const customTipInput = document.querySelector('.custom-tip');
    const numOfPeopleInput = document.querySelector('.number-of-people');
    const generateBillButton = document.querySelector('.generate-bill-btn');
    const resetButton = document.querySelector('.reset-btn');
    const tipAmountOutput = document.querySelector('.tip-amount span');
    const totalOutput = document.querySelector('.total span');
    const eachPersonBillOutput = document.querySelector('.each-person-bill span');

    let billAmount = 0;
    let tipPercentage = 0;
    let numberOfPeople = 1;

    // Helper to enable or disable inputs and buttons
    const toggleDisable = (elements, disabled) => {
        elements.forEach((el) => (el.disabled = disabled));
    };

    // Update state and enable next step
    const updateState = () => {
        const isBillValid = billAmount > 0;
        const isTipSelected = tipPercentage > 0 || customTipInput.value > 0;
        const isPeopleValid = numberOfPeople > 0;

        toggleDisable([customTipInput, numOfPeopleInput], !isBillValid);
        generateBillButton.disabled = !(isBillValid && isTipSelected && isPeopleValid);
    };

    // Event Listener: Update bill amount
    billAmountInput.addEventListener('input', (e) => {
        billAmount = parseFloat(e.target.value) || 0;
        updateState();
    });

    // Event Listener: Tip buttons
    tipButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            tipButtons.forEach((btn) => btn.classList.remove('selected')); // Reset selection
            button.classList.add('selected');
            tipPercentage = parseFloat(button.textContent) || 0;
            customTipInput.value = ''; // Reset custom tip
            updateState();
        });
    });

    // Event Listener: Custom tip input
    customTipInput.addEventListener('input', (e) => {
        tipButtons.forEach((btn) => btn.classList.remove('selected')); // Reset selection
        tipPercentage = parseFloat(e.target.value) || 0;
        updateState();
    });

    // Event Listener: Number of people
    numOfPeopleInput.addEventListener('input', (e) => {
        numberOfPeople = parseInt(e.target.value) || 0;
        updateState();
    });

    // Event Listener: Generate bill
    generateBillButton.addEventListener('click', () => {
        if (billAmount > 0 && tipPercentage > 0 && numberOfPeople > 0) {
            const tipAmount = (billAmount * tipPercentage) / 100;
            const totalAmount = billAmount + tipAmount;
            const eachPersonBill = totalAmount / numberOfPeople;

            tipAmountOutput.textContent = `₹${tipAmount.toFixed(2)}`;
            totalOutput.textContent = `₹${totalAmount.toFixed(2)}`;
            eachPersonBillOutput.textContent = `₹${eachPersonBill.toFixed(2)}`;
            resetButton.disabled = false; // Enable reset button
        }
    });

    // Event Listener: Reset button
    resetButton.addEventListener('click', () => {
        billAmount = 0;
        tipPercentage = 0;
        numberOfPeople = 1;

        billAmountInput.value = '';
        tipButtons.forEach((btn) => btn.classList.remove('selected'));
        customTipInput.value = '';
        numOfPeopleInput.value = '';
        tipAmountOutput.textContent = '';
        totalOutput.textContent = '';
        eachPersonBillOutput.textContent = '';
        resetButton.disabled = true;

        updateState();
    });

    // Initialize the state
    updateState();
});
