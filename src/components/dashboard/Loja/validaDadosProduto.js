export const cadastro = ({ produto, preco, departamento }) => {
  // Obrigatorios
  if (produto.length < 3) {
    return false;
  }
  if (!preco || preco.replace(/[^0-9.]+/g, "") <= 0) {
    return false;
  }
  if (!departamento || departamento === "") {
    return false;
  }
  // // Opcionais

  return true;
};
