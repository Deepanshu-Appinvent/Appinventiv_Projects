// Error handle
const handleInputError = (req, res, next) => {
    const { num1, num2 } = req.params;
  
    if (isNaN(num1) || isNaN(num2)) {
      throw new Error('Invalid input: Inputs must be numbers');
    }
  
    next();
  };
  
  module.exports = handleInputError;
  