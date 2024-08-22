import bcrypt from "bcrypt";

const MatchPassword = (password: string, dbPassword: string): boolean => {
  console.log(password, dbPassword)
  return bcrypt.compareSync(password, dbPassword);
};

export default MatchPassword;
