export const cadastro = ({
  produto,
  preco,
  departamento,
  descricaoCurta,
  descricaoLonga,
  precoCusto,
  precoPromocao,
  estoque,
  peso,
  largura,
  altura,
  comprimento
}) => {
  // Obrigatorios
  if (produto.length < 3) {
    return false;
  }
  if (!preco || preco <= 0) {
    return false;
  }
  if (!departamento || departamento === "") {
    return false;
  }
  // // Opcionais
  if (descricaoCurta && descricaoCurta.length < 30) {
    return false;
  }
  if (descricaoLonga && descricaoLonga.length < 60) {
    return false;
  }
  if (precoCusto && precoCusto <= 0) {
    return false;
  }
  if (precoPromocao && precoPromocao <= 0) {
    return false;
  }
  if (estoque && estoque < 0) {
    return false;
  }
  if (peso && peso < 0) {
    return false;
  }
  if (largura && largura < 0) {
    return false;
  }
  if (altura && altura < 0) {
    return false;
  }
  if (comprimento && comprimento < 0) {
    return false;
  }

  return true;
};
