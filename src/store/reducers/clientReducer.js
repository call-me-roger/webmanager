const initSate = {
  clients: []
};

const clientReducer = (state = initSate, action) => {
  switch (action.type) {
    case "CREATE_CLIENT":
      console.log("Cliente adicionado:", action.client);
      return {
        ...state,
        createClientValidation: null,
        isSendingData: false,
        clientCreated: true
      };
    case "UPDATE_CLIENT":
      console.log("Cliente atualizado:", action.client);
      return {
        ...state,
        createClientValidation: null,
        isSendingData: false,
        clientUpdated: true
      };
    case "DELETE_CLIENT":
      console.log("Cliente excluido:", action.cid);
      return {
        ...state,
        createClientValidation: null,
        isSendingData: false,
        clientDeleted: true
      };
    case "DELETE_CLIENTS":
      console.log("Clientes excluidos:", action.clients);
      return {
        ...state,
        isSendingData: false,
        clientsDeleted: true,
        clientsListError: false
      };
    case "DELETE_CLIENTS_ERROR":
      console.log("Erro ao excluir os clientes:", action.err);
      return {
        ...state,
        isSendingData: false,
        clientsDeleted: false,
        clientsListError: "Erro na exclusão de clientes"
      };
    case "CLIENT_VALIDATION":
      console.log("Erro de validação:", action.message);
      return {
        ...state,
        createClientValidation: action.message,
        isSendingData: false
      };
    case "CLIENT_ERROR":
      console.log("Erro ao salvar o cliente:", action.err);
      return {
        ...state,
        createClientValidation: "Erro ao salvar os dados",
        isSendingData: false
      };
    case "SENDING_DATA":
      return { ...state, isSendingData: true };
    case "RESET_SUBMITS":
      return {
        ...state,
        createClientValidation: null,
        isSendingData: false,
        clientCreated: false,
        clientUpdated: false,
        clientDeleted: false
      };
    case "RESET_CLIENTS_LIST":
      return {
        ...state,
        isSendingData: false,
        clientsDeleted: false,
        clientsListError: false
      };
    default:
      return state;
  }
};

export default clientReducer;
