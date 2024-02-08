import * as yup from 'yup';

export const addressSchema = yup.object().shape({
  firstName: yup
    .string('only string is allowed')
    .required('firstName is required'),
  lastName: yup
    .string('only string is allowed')
    .required('lastName is required'),
  alternativePhone: yup.number('only number is allowed'),
  pinCode: yup
    .number('only pin code is allowed')
    .required('pinCode is required'),
  state: yup.string('only string is allowed').required('state is required'),
  city: yup.string('only string is allowed').required('city is required'),
  houseNo: yup
    .string('only string is allowed')
    .required('house number is required'),
  calonyORvillage: yup
    .string('only string is allowed')
    .required('calonyORvillage is required'),
  addressType: yup
    .string('only string is allowed')
    .required('address type is required'),
});
