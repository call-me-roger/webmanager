import * as validator from "../@functions/validator";

export const cadastro = ({
  nome,
  email,
  celular,
  cpf,
  dataNascimento,
  cep,
  estado,
  cidade,
  bairro,
  rua,
  numero
}) => {
  // Obrigatorios
  if (nome.length < 3) {
    return false;
  }
  if (!validator.isEmail(email)) {
    return false;
  }
  if (celular.replace(/[^0-9.]+/g, "").length < 10) {
    return false;
  }
  // // Opcionais
  if (cpf && !validator.isCPF(cpf)) {
    return false;
  }
  if (dataNascimento && !validator.isValidDate(dataNascimento)) {
    return false;
  }
  if (cep && !validator.isCEP(cep)) {
    return false;
  }
  if (cep && estado.length < 2) {
    return false;
  }
  if (cep && cidade.length < 2) {
    return false;
  }
  if (cep && bairro.length < 2) {
    return false;
  }
  if (cep && rua.length < 2) {
    return false;
  }
  if (cep && numero.length < 1) {
    return false;
  }

  return true;
};
