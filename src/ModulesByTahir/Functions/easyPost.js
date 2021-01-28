const Easypost = require("@easypost/api");
const api = new Easypost(
  "EZTKac29498d9013471eac177657f1146b86kY1x5gKV0LLv8KwrFaQiig"
);

const fromAddress = new api.Address({
  company: "EasyPost",
  street1: "417 Montgomery Street",
  street2: "5th Floor",
  city: "San Francisco",
  state: "CA",
  zip: "94104",
  phone: "415-528-7555"
});

fromAddress.save().then(console.log);

const toAddress = new api.Address({
  name: "George Costanza",
  company: "Vandelay Industries",
  street1: "1 E 161st St.",
  city: "Bronx",
  state: "NY",
  zip: "10451"
});

toAddress.save().then(console.log);

const parcel = new api.Parcel({
  length: 9,
  width: 6,
  height: 2,
  weight: 10
});

parcel.save().then(console.log);

const shipment = new api.Shipment({
  to_address: toAddress,
  from_address: fromAddress,
  parcel: parcel
});

shipment.save().then(console.log);

// If you already have a saved shipment, or a shipment initialized
// with an id:

shipment.buy(shipment.lowestRate(["USPS"], ["First"])).then(console.log);

// or

shipment.buy("{RATE_ID}").then(console.log);

// If you do not have a saved shipment yet, you must save it first:
shipment
  .save()
  .then(s => s.buy(shipment.lowestRate(["USPS"], ["First"])).then(console.log));
