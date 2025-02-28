const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// } else if (process.argv.length !== 3 && process.argv.length !== 5) {
//   console.log("Invalid command");
//   process.exit(1);
// }

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: [
      {
        validator: (number) => number.includes("-"),
        message: (number) => `${number} must contain a "-"`,
      },

      {
        validator: (number) => {
          const [first, second] = number.split("-");
          return /^\d+$/.test(first) && /^\d+$/.test(second);
        },
        message: (number) => `${number} must contain only numbers (0-9)`,
      },

      {
        validator: (number) => {
          const first = number.split("-")[0];
          return first.length === 2 || first.length === 3;
        },
        message: () => `Numbers before "-" must be 2 or 3 digits only`,
      },
    ],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// const Person = mongoose.model("Person", personSchema);

module.exports = mongoose.model("Person", personSchema);
