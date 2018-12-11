import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  getPreloader = () => {
    return (
      <div class="progress">
        <div class="indeterminate green" />
      </div>
    );
  };
  render() {
    const { authError, auth, validatingAuth } = this.props;
    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="container">
        <form className="white z-depth-2" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Entrar</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button
              type="submit"
              className="btn green lighten-1 waves-effect waves-light"
            >
              {validatingAuth ? "Validando" : "Logar"}
            </button>
            {validatingAuth ? this.getPreloader() : null}
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
          <div />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    validatingAuth: state.auth.validatingAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
