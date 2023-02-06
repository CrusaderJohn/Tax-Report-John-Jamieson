const router = require('express').Router();
const { TaxReport } = require('../../models');
const withAuth = require('../../utils/auth');
const tax = require('../../utils/tax');

router.post('/', withAuth, async (request, response) => {
    try {
        const newTaxReport = await TaxReport.create({
            ...request.body,
            user_id: request.session.user_id,
        });

        response.status(200).json(newTaxReport);
    } catch (error) {
        response.status(400).json(error);
    }
});

router.delete('/:id', withAuth, async (request, response) => {
    try {
        const taxReportData = await TaxReport.destroy({
            where: {
                id: request.params.id,
                user_id: request.session.user_id,
            },
        });

        if (!taxReportData) {
            response.status(404).json({ message: 'No project found with this id!' });
            return;
        }

        response.status(200).json(taxReportData);
    } catch (error) {
        response.status(500).json(error);
    }
});

router.post('/update', async (request, response) => {
    try {
        const { year, income } = request.body;

        const newTax = {
            year: year,
            fedTax: tax(income)
        };

        response.status(200).json(newTax);
    } catch (error) {
        response.status(400).json(error);
    }
});

module.exports = router;
