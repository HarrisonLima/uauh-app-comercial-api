import bcrypt from "bcrypt";

const MatchPassword = (password: string, dbPassword: string): boolean => {
  return bcrypt.compareSync(password, dbPassword);
};

export default MatchPassword;
