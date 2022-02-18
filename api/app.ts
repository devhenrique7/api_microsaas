import express, { Application } from 'express'; //importando o express
import morgan from 'morgan'; //importando morgan, uma dependencia que simplifica o processo de registro de solicitações

// Aqui ele ta importando todas as rotas da Pasta totas, e atribuindo esse diretório a um nome específico
// pra ficar mais fácil de chamar 
import IndexRoutes from './routes/index.routes';
import AddressRoutes from './routes/address.routes';
import AdditionalsRoutes from './routes/additionals.routes';
import CardsRoutes from './routes/cards.routes';
import CategoryRoutes from './routes/category.routes';
import ChoiceRoutes from './routes/choices.routes';
import CouponRoutes from './routes/cupons.routes';
import CustomerRoutes from './routes/customers.routes';
import DistrictPricesRoutes from './routes/district_prices.routes';
import EstablishmentRoutes from './routes/establishment.routes';
import InvoiceRoutes from './routes/invoices.routes';
import OrderRoutes from './routes/order.routes';
import OrderStatusRoutes from './routes/order_status.routes';
import PlanRoutes from './routes/plans.routes';
import ProductRoutes from './routes/product.routes';
import PromotionRoutes from './routes/promotions.routes';
import SubscriptionRoutes from './routes/subscriptions.routes';
import UserRoutes from './routes/user.routes';

export class App {
    app: Application;

    //Método Construtor, que ja puxa o express, settings, o middleware e as rotas
    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings() {
        //Se a porta nao for especificada, ele vai pegar a porta q ta no arquivo .env, se nao tiver no env, ele coloca 3000
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    private routes() {
        this.app.use(IndexRoutes);
        this.app.use('/addresses', AddressRoutes);
        this.app.use('/categories', CategoryRoutes);
        this.app.use('/establishment', EstablishmentRoutes);
        this.app.use('/orders', OrderRoutes);
        this.app.use('/products', ProductRoutes);
        this.app.use('/users', UserRoutes);
        this.app.use('/additionals', AdditionalsRoutes);
        this.app.use('/cards', CardsRoutes);
        this.app.use('/choices', ChoiceRoutes);
        this.app.use('/cupons', CouponRoutes);
        this.app.use('/customers', CustomerRoutes);
        this.app.use('/district_prices', DistrictPricesRoutes);
        this.app.use('/invoices', InvoiceRoutes);
        this.app.use('/order_status', OrderStatusRoutes);
        this.app.use('/plans', PlanRoutes);
        this.app.use('/promotions', PromotionRoutes);
        this.app.use('/subscriptions', SubscriptionRoutes);
    }

    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}