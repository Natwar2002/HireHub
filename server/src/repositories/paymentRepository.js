import Payment from "../schema/payments.js";
import crudRepository from "./crudRepository.js";

const paymentRepository = {
    ...crudRepository(Payment),
    updateOrder: async function (orderId, data) {
        const updatedOrder = await Payment.findOneAndUpdate({ orderId }, data, { new: true });
        return updatedOrder;
    }
}

export default paymentRepository;