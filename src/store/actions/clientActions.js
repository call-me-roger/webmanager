export const createClient = clientData => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async calls to database

    const client = {
      nome: clientData.nome,
      email: clientData.email,
      celular: clientData.celular.replace("_", ""),
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
      dispatch({ type: "CLIENT_VALIDATION", message });
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
          dispatch({ type: "CLIENT_ERR", err });
        });
    };

    emailValidation(client.email);
  };
};

export const updateClient = clientData => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async calls to database

    const client = {
      cid: clientData.cid,
      nome: clientData.nome,
      email: clientData.email,
      celular: clientData.celular.replace("_", ""),
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
    const firebase = getFirebase();
    const clientsCollection = firestore.collection("clients");

    dispatch({ type: "SENDING_DATA" });

    const dispatchValidation = message => {
      dispatch({ type: "CLIENT_VALIDATION", message });
    };

    const emailValidation = () => {
      clientsCollection
        .where("email", "==", client.email)
        .get()
        .then(response => {
          const queryDocID = response.size > 0 ? response.docs[0].id : null;
          response.size > 0 && queryDocID !== client.cid
            ? dispatchValidation(
                "O email que você está tentando cadastrar já existe no sistema"
              )
            : CPFValidation();
        });
    };

    const CPFValidation = () => {
      if (client.cpf) {
        clientsCollection
          .where("cpf", "==", client.cpf)
          .get()
          .then(response => {
            const queryDocID = response.size > 0 ? response.docs[0].id : null;
            response.size > 0 && queryDocID !== client.cid
              ? dispatchValidation(
                  "O CPF que você está tentando cadastrar já existe no sistema"
                )
              : updateClient();
          });
      } else {
        updateClient();
      }
    };

    const updateClient = () => {
      const docRef = firebase
        .firestore()
        .collection("clients")
        .doc(client.cid);

      docRef
        .get()
        .then(thisDoc => {
          if (thisDoc.exists) {
            docRef.update(client);
            dispatch({ type: "UPDATE_CLIENT", client });
          } else {
            dispatch({ type: "CLIENT_ERR", err: "Cliente não encontrado" });
          }
        })
        .catch(err => {
          dispatch({ type: "CLIENT_ERR", err });
        });
    };

    emailValidation(client.email);
  };
};

export const resetSubmits = () => {
  return dispatch => {
    dispatch({ type: "RESET_SUBMITS" });
  };
};
