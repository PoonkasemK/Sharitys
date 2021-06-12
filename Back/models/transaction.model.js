module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
      chargeId: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      net:{
        type: Sequelize.DECIMAL
      },
      fee: {
        type: Sequelize.DECIMAL
      },
      date: {
        type: Sequelize.DATE(6)
      },
      status: {
        type: Sequelize.STRING
      },
      transactionId: {
        type: Sequelize.STRING
      },
      uid: {
        type: Sequelize.STRING
      },
      pjid: {
        type: Sequelize.STRING
      },
      transfered: {
        type: Sequelize.BOOLEAN
      },
    });
  
    return Transaction;
  };