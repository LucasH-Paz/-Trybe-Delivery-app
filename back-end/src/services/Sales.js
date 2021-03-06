const Sale = require('../models/Sales');

const getSale = async (id) => {
const result = await Sale.getSales(id);
return result;
};

const addNew = async (orders, payload) => {
  try {
    const sale = await Sale.addNew(payload);
    const joinTablePayload = orders
      .map(({ id, quantity }) => ({
        productId: id,
        saleId: sale.id,
        quantity: Number(quantity),
      }));
    await Sale.addRelation(joinTablePayload);

    return { sale };
  } catch (error) {
    return { err: error.message };
  }
};

const getSaleById = async (id) => {
  const result = await Sale.getSaleById(id);
  return result;
};

const getSaleDetails = async (id) => {
  const sale = await Sale.getSaleDetails(id);
  return sale;
};

const changeStatus = async (id) => {
  await Sale.changeStatus(id);
};

const getSalesBySellerId = async (id) => {
  const salesList = await Sale.getSalesBySellerId(id);
  return salesList;
};

module.exports = {
  addNew,
  getSale,
  getSaleById,
  getSaleDetails,
  changeStatus,
  getSalesBySellerId,
};
