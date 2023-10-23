import React, {useState} from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/theme";

const validateUserInfo = ({name, email, password}) => { 
  if (!name.trim()) {
    return {ok: false, error: "Name is missing"};
  }

  if (/^[a-zA-Z]+$/.test(name) === false) {
    return {ok: false, error: "Invalid name"};
  }

  if (!email.trim()) {
    return {ok: false, error: "Email is missing"};
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Invalid email" };
  }

  if (!password.trim()) {
    return {ok: false, error: "Password is missing"};
  }

  if (password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters" };
  }

  return {ok: true};
}

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { name, email, password } = userInfo;
  
  const handleChange = ({target}) => { 
    const { name, value } = target;

    setUserInfo({
      ...userInfo,
      [name]: value
    });
  }

  const handleSubmit = (e) => { 
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    
    if (!ok) {
      console.log(error);
    }


  }
  
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-72"} onSubmit={handleSubmit}>
          <Title>Sign up</Title>
          <FormInput
            label="Name"
            placeholder="John Doe"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <FormInput
            label="Email"
            placeholder="jonh@email.com"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            placeholder="********"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <Submit value="Sign up" />
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">
              Forget password
            </CustomLink>
            <CustomLink to="/auth/signin">
              Sign in
            </CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  )
}