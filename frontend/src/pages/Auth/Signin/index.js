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
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Signin({ history }) {
   const navigate = useNavigate();
   const { login } = useAuth();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");

      if (!email || !password) {
         setError("Both email and password are required.");
         return;
      }

      try {
         const loginResponse = await fetchLogin({ email, password });
         login(loginResponse);
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
                  <Heading>Signin</Heading>
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
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </FormControl>

                     <FormControl mt="4">
                        <FormLabel>Password</FormLabel>
                        <Input
                           name="password"
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </FormControl>

                     <Button mt="4" width="full" type="submit">
                        Sign In
                     </Button>
                  </form>
               </Box>
            </Box>
         </Flex>
      </div>
   );
}

export default Signin;
