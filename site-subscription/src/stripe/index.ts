import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

const createCustomer = async (email: string) => {
  const customer = await stripe.customers.create({
    email,
  });

  return customer;
};

const attachPaymentMethod = async (
  paymentMethodId: string,
  customerId: string
) => {
  const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
    customer: customerId,
  });

  return paymentMethod;
};

const setPaymentMethodAsDefault = async (
  customerId: string,
  paymentMethodId: string
) => {
  const newCustomer = await stripe.customers.update(customerId, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });

  return newCustomer;
};

const setSubscriptionDefaultPaymentMethod = async (
  subscriptionId: string,
  paymentMethodId: string
) => {
  const updated = await stripe.subscriptions.update(subscriptionId, {
    default_payment_method: paymentMethodId,
  });

  return updated;
};

const createSubscription = async (
  customerId: string,
  trialPeriod: number,
  priceId: string
) => {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    trial_period_days: trialPeriod,
    items: [{ price: priceId }],
    expand: ["latest_invoice.payment_intent"],
  });

  return subscription;
};

const updateSubscription = async (
  subscription: Stripe.Subscription,
  priceId: string
) => {
  const updatedSubscription = await stripe.subscriptions.update(
    subscription.id,
    {
      items: [
        {
          id: subscription.items.data[0].id,
          price: priceId,
        },
      ],
    }
  );

  return updatedSubscription;
};

const getSubscriptionById = async (id: string) => {
  const subscription = await stripe.subscriptions.retrieve(id);
  return subscription;
};

const getSubscriptionsByCustomerId = async (customerId: string) => {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
  });

  return subscriptions;
};

const deleteSubscription = async (subscriptionId: string) => {
  const deleted = await stripe.subscriptions.del(subscriptionId);
  return deleted;
};

const getPaymentMethod = async (paymentMethodId: string) => {
  const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
  return paymentMethod;
};

export {
  createCustomer,
  createSubscription,
  attachPaymentMethod,
  setPaymentMethodAsDefault,
  updateSubscription,
  getSubscriptionsByCustomerId,
  getSubscriptionById,
  deleteSubscription,
  getPaymentMethod,
  setSubscriptionDefaultPaymentMethod,
};
