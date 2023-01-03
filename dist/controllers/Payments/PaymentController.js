"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
require("dotenv");
const companyRespository_1 = require("../../repositories/companyRespository");
const stripe = require("stripe")("sk_test_51MKYyBChb5pCbrxpf8ZAK3FyvUp09rCVp6EL62X3vCoLhiYIkGRSW7HT7GN4WwSYwivGFyLnNSi3yg84XK0QnF9n00tdmiD1vW");
// This is your Stripe CLI webhook secret for testing your endpoint locally.
class PaymentController {
    async createCheckout(req, res) {
        const prices = await stripe.prices.list({
            lookup_keys: [req.body.lookup_key],
            expand: ["data.product"],
        });
        console.log(prices, "prices");
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: "auto",
            line_items: [
                {
                    price: prices.data[0].id,
                    // For metered billing, do not pass quantity
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `http://localhost:3333/?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3333/?canceled=true`,
        });
        console.log(session, "session");
        return res.json(session);
        // res.redirect(303, session.url);
    }
    async createSubscription(req, res) {
        var _a;
        const { company_id } = req.params;
        const { amount, interval = "month" || "year", product_name } = req.body;
        const company = companyRespository_1.companyRespository.findOneBy({ id: company_id });
        const price = await stripe.prices.create({
            unit_amount: amount,
            currency: "brl",
            recurring: { interval: interval },
            product: product_name,
        });
        const customerId = (_a = company === null || company === void 0 ? void 0 : company.stripe_customer) === null || _a === void 0 ? void 0 : _a.id;
        const priceId = price.id;
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [
                {
                    price: priceId,
                },
            ],
            payment_behavior: "default_incomplete",
            payment_settings: { save_default_payment_method: "on_subscription" },
            expand: ["latest_invoice.payment_intent"],
        });
        if (!subscription) {
            res.status(400).json({ message: "erro na criacao da assinatura" });
        }
        const newCompany = await companyRespository_1.companyRespository.create({
            ...company,
            stripe_subscription: subscription,
        });
        await companyRespository_1.companyRespository.save(newCompany);
        return res.status(201).json(subscription);
    }
}
exports.PaymentController = PaymentController;
