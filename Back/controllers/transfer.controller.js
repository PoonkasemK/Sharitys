const db = require('../models')
const Transfer = db.transfer

exports.create = (req,res) => {
    const transfer = {
        amount: req.body.amount,
        pjid: req.body.pjid,
        adid: req.body.adid
    }

    Transfer.create(transfer)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || 'Error occurred when creating the Transfer'
            })
        })
}