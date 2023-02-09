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
    $('#fedTaxOutput').text(Math.round(fedIncomeTax));

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
$('#taxInput').submit(save);
