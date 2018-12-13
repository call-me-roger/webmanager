export const createClient = clientData => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async calls to database

    const client = {
      nome: clientData.nome,
      email: clientData.email,
      celular: clientData.celular,
      cpf: clientData.cpf,
      profissao: clientData.profissao,
      dataNascimento: clientData.dataNascimento,
      sexo: clientData.sexo,
      indicacao: clientData.indicacao,
      cep: clientData.cep,
      estado: clientData.estado,
      cidade: clientData.cidade,
      bairro: clientData.bairro,
      rua: clientData.rua,
      numero: clientData.numero,
      complemento: clientData.complemento
    };

    const firestore = getFirestore();
    const clientsCollection = firestore.collection("clients");

    dispatch({ type: "SENDING_DATA" });

    const dispatchValidation = message => {
      dispatch({ type: "CREATE_CLIENT_VALIDATION", message });
    };

    const emailValidation = () => {
      clientsCollection
        .where("email", "==", client.email)
        .get()
        .then(response =>
          response.size === 0
            ? CPFValidation()
            : dispatchValidation(
                "O email que você está tentando cadastrar já existe no sistema"
              )
        );
    };

    const CPFValidation = () => {
      if (client.cpf) {
        clientsCollection
          .where("cpf", "==", client.cpf)
          .get()
          .then(response =>
            response.size === 0
              ? addClient()
              : dispatchValidation(
                  "O CPF que você está tentando cadastrar já existe no sistema"
                )
          );
      } else {
        addClient();
      }
    };

    const addClient = () => {
      clientsCollection
        .add({
          ...client,
          createdAt: new Date()
        })
        .then(() => {
          dispatch({ type: "CREATE_CLIENT", client });
        })
        .catch(err => {
          dispatch({ type: "CREATE_CLIENT_ERR", err });
        });
    };

    emailValidation(client.email);
  };
};

export const resetCreating = () => {
  return dispatch => {
    dispatch({ type: "RESET_CREATING" });
  };
};
