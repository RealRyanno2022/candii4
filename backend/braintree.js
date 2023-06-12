const braintree = require('braintree');

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: '68hm2gvfh55njddz',
  publicKey: 'h677zvw7kr27xfwf',
  privateKey: '67cd740d2cd2a53c5953cfc32663d522',
});

const getClientToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response.clientToken);
    }
  });
};

const processPayment = (req, res) => {
  const { paymentMethodNonce, amount } = req.body;

  gateway.transaction.sale({
    amount,
    paymentMethodNonce,
    options: {
      submitForSettlement: true,
    },
  }, (err, result) => {
    if (err || !result.success) {
      res.status(500).send(err || 'Payment error');
    } else {
      res.send('Payment successful');
    }
  });
};

module.exports = {
  gateway,
  getClientToken,
  processPayment,
};