const initSate = {
  clients: []
};

const clientReducer = (state = initSate, action) => {
  switch (action.type) {
    case "CREATE_CLIENT":
      console.log("Cliente adicionado", action.client);
      return state;
    case "CREATE_CLIENT_ERROR":
      console.log("Erro ao salvar o cliente", action.err);
      return state;
    default:
      return state;
  }
};

export default clientReducer;
