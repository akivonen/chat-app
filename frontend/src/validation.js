import * as Yup from 'yup';

const messageSchema = Yup.object().shape({
  body: Yup.string().trim().required(),
});

const loginSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required('validation.required')
    .min(3, 'validation.minmax')
    .max(20, 'validation.minmax'),
  password: Yup.string()
    .trim()
    .required('validation.required')
    .min(6, 'validation.min6'),
  confirmPassword: Yup.string()
    .trim()
    .min(6, 'validation.min6')
    .required('validation.required')
    .oneOf(
      [Yup.ref('password'), null],
      'validation.mustMatch',
    ),
});

const getChannelSchema = (channelNames) => Yup.object({
  name: Yup.string()
    .trim()
    .required('validation.required')
    .min(3, 'validation.minmax')
    .max(20, 'validation.minmax')
    .notOneOf(channelNames, 'validation.channelAlreadyExists'),
});

export {
  messageSchema, loginSchema, signUpSchema, getChannelSchema,
};
