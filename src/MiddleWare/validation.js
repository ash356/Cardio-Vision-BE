import joi from "joi";

export const generalFields = {
  email: joi.string().email({
    minDomainSegments: 2,
    maxDomainSegments: 3,
    tlds: { allow: ["com", "net", "edu"] },
  }),
  password: joi
    .string()
    .pattern(
      new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[a-zA-Z]).{8,}$/
      )
    ),
  id: joi.string().required().min(24).max(24).required(),
  file: joi.object({
    size: joi.number().positive().required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(),
    encoding: joi.string().required(),
    originalname: joi.string().required(),
    fieldname: joi.string().required(),
  }),
};

export const validation = (schema) => {
  return (req, res, next) => {
    const inputData = { ...req.body, ...req.query, ...req.params };
    if (req.file || req.files) {
      inputData.file = req.file || req.files;
    }
    const validationResult = schema.validate(inputData, { abortEarly: false });
    if (validationResult.error?.details) {
      return res.status(400).json({
        message: "Validation Error !",
        ValidationError: validationResult.error.details,
      });
    }
    return next();
  };
};
