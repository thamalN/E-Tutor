module.exports = function (app, db, stripe, uuid) {

    app.get("/paymentStudent", (req, res) => {
        res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
      });

app.post("/paymentStudent", async (req, res) => {
    console.log("Request:", req.body);
  
    let error;
    let status;
    try {
      const token  = req.body;
  
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });
  
      const idempotency_key = uuid();
      const charge = await stripe.charges.create(
        {
        //   amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
        //   description: `Purchased the ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        },
        {
          idempotency_key
        }
      );
      console.log("Charge:", { charge });
      status = "success";
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }
  
    res.json({ error, status });
  });







  
}