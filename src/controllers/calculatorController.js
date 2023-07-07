//add
const add = (req, res, next) => {
  const { num1, num2 } = req.params;

  if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
    const error = new Error("Invalid input");
    return next(error);
  }

  const result = parseFloat(num1) + parseFloat(num2);
  res.json({ result });
};


//subtract
const sub = (req, res, next) => {
  const { num1, num2 } = req.params;

  if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
    const error = new Error("Invalid input");
    return next(error);
  }

  const result = parseFloat(num1) - parseFloat(num2);
  res.json({ result });
};


// Multiply
const mul = (req, res, next) => {
  const { num1, num2 } = req.params;

  if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
    const error = new Error("Invalid input");
    return next(error);
  }

  const result = parseFloat(num1) * parseFloat(num2);
  res.json({ result });
};


// Division
const div = (req, res, next) => {
  const { num1, num2 } = req.params;

  if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
    const error = new Error("Invalid input");
    return next(error);
  }

  const result = parseFloat(num1) / parseFloat(num2);
  res.json({ result });
};

module.exports = { add, sub, mul, div };
