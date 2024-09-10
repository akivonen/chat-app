import * as Yup from 'yup';

const getChannelSchema = (channelNames) => Yup.object({
  name: Yup.string()
    .trim()
    .required('validation.required')
    .min(3, 'validation.minmax')
    .max(20, 'validation.minmax')
    .notOneOf(channelNames, 'validation.channelAlreadyExists'),
});

export default getChannelSchema;
