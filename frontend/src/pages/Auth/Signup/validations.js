import * as yup from "yup";

const validations = yup.object().shape({
   email: yup
      .string()
      .email("Please enter a valid email")
      .required("This field is required"),
   password: yup
      .string()
      .min(10, "Your password must be at least 10 characters long")
      .required(),
   passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required(),
});

export default validations;
