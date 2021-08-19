import React from "react";

const Homepage = () => {
  return (
    <section className="section login-sect">
      <div className="loginElements-center">
        <div className="login-formContainer">
          <form action="SvLogin" method="POST">
            <div className="login-formTitle">
              <h2>Mi Hotel</h2>
            </div>
            <div className="login-formContent">
              <div className="login-formInputs">
                <p className="login-singleInput">
                  Usuario: <input type="text" name="username" />
                </p>
                <p className="login-singleInput">
                  Contraseña: <input type="password" name="password" />
                </p>
              </div>
              <div className="login-formButtons">
                <input type="submit" className="formBtn" value="Login" />
              </div>
            </div>
          </form>
          {/* <div className="login-errorMsg">
                        <h3></h3>                   
                    </div> */}
        </div>
      </div>
    </section>
  );
};

export default Homepage;
