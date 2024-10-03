import * as Yup from 'yup';

class ProductController {
    async Stora(resquest, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            categary: Yup.string().required(),
        });
        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }
    }
}

export default new ProductController();