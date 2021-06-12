const db = require('../models')
const Transaction = db.transactions
const Op = db.Sequelize.Op

// create a Transaction
exports.create = (req,res) => {
    if(!req.body.chargeId){
        res.status(400).send({
            message: 'chargeId cannot be empty'
        })
        return;
    }
    
    const transaction = {
        chargeId: req.body.chargeId,
        amount: req.body.amount/100,
        net: req.body.net/100,
        fee: req.body.fee/100,
        date: req.body.date,
        status: req.body.status,
        transactionId: req.body.transactionId,
        uid: req.body.uid,
        pjid: req.body.pjid,
        transfered: false
    }

    Transaction.create(transaction)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || 'Error occurred when creating the Transaction'
            })
        })
}

// find all transactions
exports.findAll = (req, res) => {
    const pjid = req.query.pjid;
    console.log(pjid)
  
    Transaction.findAll({where: {pjid: pjid}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Transactions."
        });
      });
  };

// find projects that transfered === false
exports.findAllTransferable = (req,res) => {
    const pjid = req.query.pjid
    // console.log(pjid)

    Transaction.findAll({ where: {pjid: pjid, status: 'successful', transfered: false} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transaction(s)."
      });
    });
};

// find projects that transfered === true
exports.findAllTransfered = (req,res) => {
    const pjid = req.query.pjid

    Transaction.findAll({ where: {pjid: pjid, transfered: true} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transaction(s)."
      });
    });
};

// find all donation record of uid
exports.donationHistory = (req,res) => {
    const uid = req.query.uid

    Transaction.findAll({ where: {uid: uid} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transaction(s)."
      });
    });
};

// find a project with 'chargeId'
exports.findOne = (req,res) => {
    const chargeId = req.params.chargeId
    console.log(chargeId)

    Transaction.findOne({where: {chargeId: chargeId}})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retriving Transaction with id= '+id
            })
        })
}

// update Transfered status
exports.update = (req,res) => {
    const id = req.params.id
    // console.log(id)

    Transaction.update({transfered: true}, {
        where: {id: id}
    })
        .then(num => {
            if(num==1){
                res.send({
                    message: 'Transaction\'s transfer status updated successfully'
                })
            }else{
                res.send({
                    message: 'Cannot update Transaction\'s transfer status with id='+id+'. Maybe Transaction was not found or req.body is empty!'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
              message: "Error updating Transation with id=" + id
            });
        })
}

// delete with chargeId
exports.delete = (req,res) => {
    const id = req.params.id;

    Transaction.destroy({
        where: { 
            id: id,
            transfered: true}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                message: "Transaction was deleted successfully!"
                });
            } else {
                res.send({
                message: `Cannot delete Transaction with id=${id}. Maybe Transaction was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Transaction with id=" + id
            });
        });
}

// delete all Transactions
exports.deleteAll = (req, res) => {
    Transaction.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Transactions were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Transactions."
        });
      });
  };