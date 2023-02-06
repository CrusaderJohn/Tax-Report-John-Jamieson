function fedTax(year, income) {
    let fedIncomeTax = 0;

    const fedBrackets = [0,14398,50197,100392,155625,221708]
    const fedRates = [0,.15,.205,.26,.29,.33]

    if (income < fedBrackets[1]) {
        // No tax
    } else if (income < fedBrackets[2]) {
        fedIncomeTax = (income - fedBrackets[1]) * fedRates[1];
    } else if (income < fedBrackets[3]) {
        fedIncomeTax = (fedBrackets[2] - fedBrackets[1]) * fedRates[1];
        fedIncomeTax = fedIncomeTax + (income - fedBrackets[2]) * fedRates[2];
    } else if (income < fedBrackets[4]) {
        fedIncomeTax = (fedBrackets[2] - fedBrackets[1]) * fedRates[1];
        fedIncomeTax = fedIncomeTax + (fedBrackets[3] - fedBrackets[2]) * fedRates[2];
        fedIncomeTax = fedIncomeTax + (income - fedBrackets[3]) * fedRates[3];
    } else if (income < fedBrackets[5]) {
        fedIncomeTax = (fedBrackets[2] - fedBrackets[1]) * fedRates[1];
        fedIncomeTax = fedIncomeTax + (fedBrackets[3] - fedBrackets[2]) * fedRates[2];
        fedIncomeTax = fedIncomeTax + (fedBrackets[4] - fedBrackets[3]) * fedRates[3];
        fedIncomeTax = fedIncomeTax + (income - fedBrackets[4]) * fedRates[4];
    } else {
        fedIncomeTax = (fedBrackets[2] - fedBrackets[1]) * fedRates[1];
        fedIncomeTax = fedIncomeTax + (fedBrackets[3] - fedBrackets[2]) * fedRates[2];
        fedIncomeTax = fedIncomeTax + (fedBrackets[4] - fedBrackets[3]) * fedRates[3];
        fedIncomeTax = fedIncomeTax + (fedBrackets[5] - fedBrackets[4]) * fedRates[4];
        fedIncomeTax = fedIncomeTax + (income - fedBrackets[5]) * fedRates[5];
    }

    return fedIncomeTax;
}

const update = async (event) => {
    event.preventDefault();

    const year = Number($('#yearInput').val().trim());
    const income = Number($('#incomeInput').val().trim());

    if (year && income) {
        const response = await fetch(`/api/taxReports/update`, {
            method: 'POST',
            body: JSON.stringify({year, income}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();

            $('.yearOutput').text(data.year);
            $('#fedTaxOutput').text(data.fedTax);

        } else {
            alert('Failed to create project');
        }
    }

};

const save = async (event) => {
    event.preventDefault();

    const year = Number($('#yearInput').val().trim());
    const income = Number($('#incomeInput').val().trim());

    const fedIncomeTax = fedTax(year, income);

    $('.yearOutput').text(year);
    $('#fedTaxOutput').text(fedIncomeTax);

    if (year && income) {
        const response = await fetch(`/api/taxReports`, {
            method: 'POST',
            body: JSON.stringify({ year, income }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/account');
        } else {
            alert('Failed to create tax report');
        }
    }
};

$("#update").on("click",update);
$("#save").on("click", $('#taxInput').submit(save));
