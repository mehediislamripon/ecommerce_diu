import React, { useState } from "react";
import {
   Flex,
   Box,
   Heading,
   FormControl,
   FormLabel,
   Input,
   Button,
   Alert,
} from "@chakra-ui/react";
import { fetcRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
   const navigate = useNavigate();
   const { login } = useAuth();
   const [formData, setFormData] = useState({
      email: "",
      password: "",
      passwordConfirm: "",
   });
   const [error, setError] = useState(null);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);

      if (formData.password !== formData.passwordConfirm) {
         setError("Passwords do not match.");
         return;
      }

      try {
         const registerResponse = await fetcRegister({
            email: formData.email,
            password: formData.password,
         });
         login(registerResponse);
         //  navigate to the profile page
         navigate("/profile");
      } catch (e) {
         setError(e.response?.data?.message || "An error occurred.");
      }
   };

   return (
      <div>
         <Flex align="center" width="full" justifyContent="center">
            <Box pt={10}>
               <Box textAlign="center">
                  <Heading>Signup</Heading>
               </Box>
               <Box my={5}>
                  {error && <Alert status="error">{error}</Alert>}
               </Box>
               <Box my={5} textAlign="left">
                  <form onSubmit={handleSubmit}>
                     <FormControl>
                        <FormLabel>E-mail</FormLabel>
                        <Input
                           name="email"
                           onChange={handleChange}
                           value={formData.email}
                        />
                     </FormControl>

                     <FormControl mt="4">
                        <FormLabel>Password</FormLabel>
                        <Input
                           name="password"
                           type="password"
                           onChange={handleChange}
                           value={formData.password}
                        />
                     </FormControl>

                     <FormControl mt="4">
                        <FormLabel>Password Confirm</FormLabel>
                        <Input
                           name="passwordConfirm"
                           type="password"
                           onChange={handleChange}
                           value={formData.passwordConfirm}
                        />
                     </FormControl>

                     <Button mt="4" width="full" type="submit">
                        Sign Up
                     </Button>
                  </form>
               </Box>
            </Box>
         </Flex>
      </div>
   );
}

export default Signup;
