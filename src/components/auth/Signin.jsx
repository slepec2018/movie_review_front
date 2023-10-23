import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/theme";

export default function Signin() { 
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-72"}>
          <Title>Sign in</Title>
          <FormInput
            label="Email"
            placeholder="jonh@email.com"
            name="email"
          />
          <FormInput
            label="Password"
            placeholder="********"
            name="password"
            type="password"
          />
          <Submit value="Sign in" />
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">
              Forget password
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
