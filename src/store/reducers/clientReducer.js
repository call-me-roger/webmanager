const initSate = {
  clients: []
};

const clientReducer = (state = initSate, action) => {
  switch (action.type) {
    case "CREATE_CLIENT":
      console.log("Cliente adicionado", action.client);
      return {
        ...state,
        createClientValidation: null,
        isSendingData: false,
        clientCreated: true
      };
    case "CREATE_CLIENT_VALIDATION":
      console.log("Erro de validação:", action.message);
      return {
        ...state,
        createClientValidation: action.message,
        isSendingData: false
      };
    case "CREATE_CLIENT_ERROR":
      console.log("Erro ao salvar o cliente", action.err);
      return { ...state, isSendingData: false };
    case "SENDING_DATA":
      return {
        ...state,
        isSendingData: true
      };
    case "RESET_CREATING":
      return {
        ...state,
        createClientValidation: null,
        isSendingData: false,
        clientCreated: false
      };
    default:
      return state;
  }
};

export default clientReducer;
