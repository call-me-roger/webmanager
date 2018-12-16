const initSate = {
  products: []
};

const productReducer = (state = initSate, action) => {
  switch (action.type) {
    case "CREATE_PRODUCT":
      console.log("Produto adicionado:", action.product);
      return {
        ...state,
        createProductValidation: null,
        isSendingData: false,
        productCreated: true
      };
    case "UPDATE_PRODUCT":
      console.log("Produto atualizado:", action.product);
      return {
        ...state,
        createProductValidation: null,
        isSendingData: false,
        productUpdated: true
      };
    case "DELETE_PRODUCT":
      console.log("produto excluido:", action.pid);
      return {
        ...state,
        createProductValidation: null,
        isSendingData: false,
        productDeleted: true
      };
    case "DELETE_PRODUCTS":
      console.log("produtos excluidos:", action.products);
      return {
        ...state,
        isSendingData: false,
        productsDeleted: true,
        productsListError: false
      };
    case "DELETE_PRODUCTS_ERROR":
      console.log("Erro ao excluir os produtos:", action.err);
      return {
        ...state,
        isSendingData: false,
        productsDeleted: false,
        productsListError: "Erro na exclusão de produtos"
      };
    case "PRODUCT_VALIDATION":
      console.log("Erro de validação:", action.message);
      return {
        ...state,
        createProductValidation: action.message,
        isSendingData: false
      };
    case "PRODUCT_ERROR":
      console.log("Erro ao salvar o produto:", action.err);
      return {
        ...state,
        createProductValidation: "Erro ao salvar os dados",
        isSendingData: false
      };
    case "SENDING_DATA":
      return { ...state, isSendingData: true };
    case "RESET_SUBMITS":
      return {
        ...state,
        createProductValidation: null,
        isSendingData: false,
        productCreated: false,
        productUpdated: false,
        productDeleted: false
      };
    case "RESET_PRODUCTS_LIST":
      return {
        ...state,
        isSendingData: false,
        productsDeleted: false,
        productsListError: false
      };
    default:
      return state;
  }
};

export default productReducer;
