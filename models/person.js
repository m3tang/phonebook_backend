const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// } else if (process.argv.length !== 3 && process.argv.length !== 5) {
//   console.log("Invalid command");
//   process.exit(1);
// }

const password = process.argv[2];

const url = `mongodb+srv://m3tang:dsZ7TdnnNgQkKjdp@cluster0.iw3cd.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

function numberValidator(number) {
  if (!number.includes("-")) {
    return false;
  }
  const [first, second] = number.split("-", 2);

  return val === "something";
}

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
          const [first, second] = number.split("-");
          return first.length === 2 || first.length === 3;
        },
        message: (number) => `Numbers before "-" must be 2 or 3 digits only`,
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

const Person = mongoose.model("Person", personSchema);

module.exports = mongoose.model("Person", personSchema);

// Add a person if passing in 5 args
// if (process.argv.length === 5) {
//   const person = new Person({
//     name: process.argv[3],
//     number: process.argv[4],
//   });

//   person.save().then((result) => {
//     console.log("Person saved");
//     mongoose.connection.close();
//   });
// }

// if (process.argv.length === 3) {
//   Person.find({}).then((result) => {
//     result.forEach((r) => console.log(r));
//     mongoose.connection.close();
//   });
// }
