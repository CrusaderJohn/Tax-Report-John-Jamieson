const tax2022 = require('tax-2022');

const tax = (income) => {
    return tax2022.getTotalTaxAmount("ON",income);
};

module.exports = tax;
