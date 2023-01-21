import {body,validationResult} from "express-validator"

function registryvalidation(){
    return[
        body("username", "User name is required").notEmpty().isLength({min: 3}),
        body("email", "Email is required").isEmail(),
        body("phone", "phone is required").isMobilePhone(),
        body("location","Location required").notEmpty(),
        body("password", "Please must have 1 lowercase 1 uppercase 1 symbol and should be 8 characters")
        .isStrongPassword(),
        body('password2').custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Password confirmation does not match password');
            }
        
            return true;
          })
    ]
}

function loginvalidation(){
    return[
        body("email", "Email is required").isEmail(),
        body("password", "Please must have 1 lowercase 1 uppercase 1 symbol and should be 8 characters")
        
    ]
}

function errorValidation(req,res,next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next()
};

export {registryvalidation,errorValidation,loginvalidation}