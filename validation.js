import Joi from '@hapi/joi';


export const registerationvalidation = data => {
    const schema = Joi.object( {
        name: Joi.string()
        .min(6)
        .required(),
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required()
    });

    return schema.validate(data);

};


export const loginvalidation = data => {
    const schema = Joi.object( {
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required()
    });

    return schema.validate(data);

};

