export const isValidEmail = (email) => { 
  if (!email.trim()) {
    return false;
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return false;
  }

  return true;
};