import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/theme";
import { useNotification, useAuth } from "../../hooks";

const validateUserInfo = ({ email, password}) => { 
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

export default function Signin() { 
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const {isPending, isLoggedIn} = authInfo;
  
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  const handleSubmit = (e) => { 
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) { 
      return updateNotification(error, "error");
    }

    handleLogin(userInfo.email, userInfo.password);
  }

  useEffect(() => { 
    if (isLoggedIn) { 
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-72"} onSubmit={handleSubmit} >
          <Title>Sign in</Title>
          <FormInput
            label="Email"
            placeholder="jonh@email.com"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            placeholder="********"
            name="password"
            type="password"
            value={userInfo.password}
            onChange={handleChange}
          />
          <Submit value="Sign in" busy={isPending} />
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
