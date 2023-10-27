import React, {useState} from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/theme";
import { forgetPassword } from "../../api/auth";
import { isValidEmail } from "../../utils/helper";
import { useNotification } from "../../hooks";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  }

  const handleSubmit = async (e) => { 
    e.preventDefault();

    if (!isValidEmail(email)) {
      return updateNotification('error', 'Invalid email');
    }

    const { error, message } = await forgetPassword(email);
    
    if (error) { 
      return updateNotification('error', error);
    }

    updateNotification('success', message);
  }

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-96"} onSubmit={handleSubmit} >
          <Title>Please Enter Your Email</Title>
          <FormInput
            label="Email"
            placeholder="jonh@email.com"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <Submit value="Send Link" />
          <div className="flex justify-between">
            <CustomLink to="/auth/signin">
              Sign In
            </CustomLink>
            <CustomLink to="/auth/signup">
              Sign up
            </CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  )
}