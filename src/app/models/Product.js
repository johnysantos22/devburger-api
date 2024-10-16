import Sequelize, { Model } from 'sequelize';

class Product extends Model {

    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                price: Sequelize.INTEGER,
                path: Sequelize.STRING,
                rul: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `http://localhost:3001/product-file/${this.path}`;
                    },
                }
            },
            {
                sequelize,
            },
        );
        return this;
    }

    static associate(model) {
        this.belongsTo(model.Category, {
            foreignKey: 'category_id', as: 'category'
        });

    }
}

export default Product;