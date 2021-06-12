module.exports = (sequelize, Sequelize) => {
    const Transfer = sequelize.define("transfer", {
        amount:{
            type: Sequelize.DECIMAL
        },
        pjid: {
            type: Sequelize.STRING
        },
        adid: {
            type: Sequelize.STRING
        }
    })
  
    return Transfer;
  };