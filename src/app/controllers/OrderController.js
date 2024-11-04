import * as Yup from 'yup';
import Order from '../schema/Order';
import Products from '../models/Product';

class OrderController {
    async store(request, response) {
        const schema = Yup.object({
            products: Yup.array()
                .required()
                .of(
                    Yup.object({
                        id: Yup.number().required(),
                        quantity: Yup.number().required(),
                    })
                ),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ message: err.errors });
        }

        const { products } = request.body;
        const productsIds = products.map((product) => product.id);

        const findProducts = await Products.findAll({
            where: {
                id: productsIds,
            },
        });

        // Cria o pedido com os dados
        const orderData = {
            user: {
                id: request.userId,
                name: request.userName,
            },
            products: findProducts,
        };

        // Salva o pedido no banco de dados
        const createdOrder = await Order.create(orderData);

        return response.status(201).json(createdOrder);
    }
}

export default new OrderController();
