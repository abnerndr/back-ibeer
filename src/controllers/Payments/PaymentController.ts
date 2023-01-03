import { Request, Response } from "express";
import "dotenv";
import { companyRespository } from "../../repositories/companyRespository";
import { Company } from "../../entities/Company";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
export class PaymentController {
  async create_subscription(req: Request, res: Response) {
    const { company_id } = req.params;

    const {
      full_name,
      card_number,
      exp_month,
      exp_year,
      cvc,
      street,
      street_number,
      zip_code,
      state,
      city,
      country,
    } = req.body;
    const company: any = await companyRespository.findOne({
      where: { id: company_id },
    });

    if (!company_id) {
      res.status(400).json({ message: "id não informado" });
    }

    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: card_number,
        exp_month,
        exp_year,
        cvc,
      },
    });

    const customer = await stripe.customers.create({
      payment_method: paymentMethod.id,
      email: company.email,
      name: company.user_name,
      phone: company.cellphone,
      shipping: {
        address: {
          city: city,
          country: country,
          line1: `${street_number}, ${street}`,
          postal_code: zip_code,
          state: state,
        },
        name: full_name,
      },
      address: {
        city: city,
        country: country,
        line1: `${street_number}, ${street}`,
        postal_code: zip_code,
        state: state,
      },
    });

    const customerId = customer.id;
    const priceId = "price_1MMAeBChb5pCbrxpDAWPG2jT";

    console.log("customerId", customer.id);
    console.log("priceId", priceId);

    const subscription = await stripe.subscriptions.create({
      default_payment_method: paymentMethod.id,
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

    company.stripe_subscription = subscription;
    company.stripe_customer = customer;

    const newCompany = await companyRespository.merge({
      ...company,
      stripe_subscription: subscription,
      stripe_customer: customer,
    });

    console.log(newCompany);

    await companyRespository.save(newCompany);

    return res.status(201).json({ subscription });
  }
}
