exports.validateRegisterInput = (
  username,
  email,
  password,
  passwordConfirm
) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username =
      'Username field is required! You need to provide a username';
  } else if (email.trim() === '') {
    errors.email =
      'Email field is required! You need to provide a valid email address';
  } else {
    const emailChecker =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!email.match(emailChecker)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password === '') {
    errors.password = 'Password must be provided!';
  } else if (passwordConfirm === '' || passwordConfirm !== password) {
    errors.passwordConfirm = 'Passwords must match!!';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
exports.validateLogin = (email, password) => {
  const errors = {};
  if (email.trim() === '') {
    errors.email =
      'Email field is required! You need to provide a valid email address';
  }
  if (password === '') {
    errors.password = 'Password must be provided!';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
