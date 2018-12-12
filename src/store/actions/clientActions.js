export const createClient = client => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async calls to database
    const firestore = getFirestore();
    firestore
      .collection("clients")
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
};
