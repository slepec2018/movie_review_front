import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/theme";
import { createUser } from "../../api/auth";
import { useNotification } from "../../hooks";
import { useAuth } from "../../hooks";

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

  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const { updateNotification } = useNotification();

  const { name, email, password } = userInfo;
  
  const handleChange = ({target}) => { 
    const { name, value } = target;

    setUserInfo({
      ...userInfo,
      [name]: value
    });
  }

  const handleSubmit = async (e) => { 
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    
    if (!ok) {
      return updateNotification('error', error);
    }

    const response = await createUser(userInfo);
    
    if (response.error) {
      return console.log(response.error);
    }

    navigate("/auth/verification", { state: { user: response.user }, replace: true});
  }

  useEffect(() => { 
    if (isLoggedIn) { 
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  
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