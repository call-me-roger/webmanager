export const createProduct = productData => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async calls to database

    const slug = productData.produto
      ? productData.produto.replace(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      : null;

    const product = {
      slug,
      produto: productData.produto,
      preco: productData.preco,
      departamento: productData.departamento,
      descricaoCurta: productData.descricaoCurta,
      descricaoLonga: productData.descricaoLonga,
      precoCusto: productData.precoCusto,
      precoPromocao: productData.precoPromocao,
      marca: productData.marca,
      estoque: productData.estoque,
      imagem: productData.imagem,
      peso: productData.peso,
      altura: productData.altura,
      largura: productData.largura,
      comprimento: productData.comprimento
    };

    const firestore = getFirestore();
    const productsCollection = firestore.collection("products");

    dispatch({ type: "SENDING_DATA" });

    const dispatchValidation = message => {
      dispatch({ type: "PRODUCT_VALIDATION", message });
    };

    const slugValidation = () => {
      productsCollection
        .where("slug", "==", product.slug)
        .get()
        .then(response => {
          const queryDocID = response.size > 0 ? response.docs[0].id : null;
          response.size > 0 && queryDocID !== product.pid
            ? dispatchValidation(
                "O nome do produto que você está tentando cadastrar já existe no sistema"
              )
            : addProduct();
        });
    };

    const addProduct = () => {
      productsCollection
        .add({
          ...product,
          createdAt: new Date()
        })
        .then(() => {
          dispatch({ type: "CREATE_PRODUCT", product });
        })
        .catch(err => {
          dispatch({ type: "PRODUCT_ERR", err });
        });
    };

    slugValidation();
  };
};

export const updateProduct = productData => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async calls to database

    const product = {
      pid: productData.pid,
      produto: productData.produto,
      slug: productData.produto.replace(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      preco: productData.preco,
      departamento: productData.departamento,
      descricaoCurta: productData.descricaoCurta,
      descricaoLonga: productData.descricaoLonga,
      precoCusto: productData.precoCusto,
      precoPromocao: productData.precoPromocao,
      marca: productData.marca,
      estoque: productData.estoque,
      imagem: productData.imagem,
      peso: productData.peso,
      altura: productData.altura,
      largura: productData.largura,
      comprimento: productData.comprimento
    };

    const firestore = getFirestore();
    const firebase = getFirebase();
    const productsCollection = firestore.collection("products");

    dispatch({ type: "SENDING_DATA" });

    const dispatchValidation = message => {
      dispatch({ type: "PRODUCT_VALIDATION", message });
    };

    const slugValidation = () => {
      productsCollection
        .where("slug", "==", product.slug)
        .get()
        .then(response => {
          const queryDocID = response.size > 0 ? response.docs[0].id : null;
          response.size > 0 && queryDocID !== product.pid
            ? dispatchValidation(
                "O nome do produto que você está tentando cadastrar já existe no sistema"
              )
            : updtProduct();
        });
    };

    const updtProduct = () => {
      const docRef = firebase
        .firestore()
        .collection("products")
        .doc(product.pid);

      docRef
        .get()
        .then(thisDoc => {
          if (thisDoc.exists) {
            docRef.update(product);
            dispatch({ type: "UPDATE_PRODUCT", product });
          } else {
            dispatch({ type: "PRODUCT_ERR", err: "Produto não encontrado" });
          }
        })
        .catch(err => {
          dispatch({ type: "PRODUCT_ERR", err });
        });
    };

    slugValidation();
  };
};

export const deleteProduct = pid => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    console.log(pid);

    dispatch({ type: "SENDING_DATA" });

    const dispatchValidation = message => {
      dispatch({ type: "PRODUCT_VALIDATION", message });
    };

    const docRef = firebase
      .firestore()
      .collection("products")
      .doc(pid);

    docRef
      .get()
      .then(thisDoc => {
        if (thisDoc.exists) {
          docRef
            .delete()
            .then(() => {
              dispatch({ type: "DELETE_PRODUCT", pid });
            })
            .catch(err => {
              dispatchValidation("Ocorreu um erro ao excluir o produto");
            });
        } else {
          dispatchValidation("Ocorreu um erro ao excluir o produto");
        }
      })
      .catch(err => {
        dispatchValidation("Ocorreu um erro ao excluir o produto");
      });
  };
};

export const deleteProducts = productsOBJ => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const batch = firestore.batch();

    dispatch({ type: "SENDING_DATA" });

    const handleDelete = async productDocuments => {
      productDocuments.forEach(doc => batch.delete(doc));
      batch
        .commit()
        .then(() => {
          dispatch({ type: "DELETE_PRODUCTS", products: productsOBJ });
        })
        .catch(err => {
          dispatch({
            type: "DELETE_PRODUCTS_ERROR",
            err: "Erro de exclusão"
          });
        });
    };

    if (typeof productsOBJ === "object") {
      const queryDocuments = async () => {
        const getDocuments = Object.keys(productsOBJ).map(async key => {
          const pid = productsOBJ[key];
          const docRef = await firebase
            .firestore()
            .collection("products")
            .doc(pid);

          return docRef;
        });

        return Promise.all(getDocuments);
      };

      queryDocuments().then(productDocuments => {
        handleDelete(productDocuments);
      });
    } else {
      console.log("Não foi possível executar a função");
      dispatch({ type: "DELETE_PRODUCTS_ERROR", err: "Formato inválido" });
    }
  };
};

export const resetSubmits = () => {
  return dispatch => {
    dispatch({ type: "RESET_SUBMITS" });
  };
};

export const resetProductsList = () => {
  return dispatch => {
    dispatch({ type: "RESET_PRODUCTS_LIST" });
  };
};
