import { useState } from "react";
import "./App.css";

function App() {
  const initialValues = { username: "", mailAddress: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [onSubmit, setOnSubmit] = useState(false);

  const handleChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // バリデーションチェック
    setFormErrors(validate(formValues));
    setOnSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regax =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    if (!values.username) {
      errors.username = "ユーザー名を入力してください";
    }
    if (!values.mailAddress) {
      errors.mailAddress = "メールアドレスを入力してください";
    } else if (!regax.test(values.mailAddress)) {
      errors.mailAddress = "正しいメールアドレスを入力してください";
    }
    if (!values.password) {
      errors.password = "パスワードを入力してください";
    } else if (values.password.length < 4) {
      errors.password = "4字以上15字以下のパスワードを入力してください";
    } else if (values.password.length > 15) {
      errors.password = "4字以上15字以下のパスワードを入力してください";
    }
    console.log(errors);
    return errors;
  };

  return (
    <div className="form-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Login Form</h1>
        <hr color="#fff33f"></hr>
        <div className="ui-form">
          <div className="form-field">
            <input
              type="text"
              placeholder="ユーザー名"
              name="username"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <p className="error-msg">{formErrors.username}</p>
          <div className="form-field">
            <input
              type="email"
              placeholder="メールアドレス"
              name="mailAddress"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <p className="error-msg">{formErrors.mailAddress}</p>
          <div className="form-field">
            <input
              type="password"
              placeholder="パスワード"
              name="password"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <p className="error-msg">{formErrors.password}</p>
          <button className="submit-button">ログイン</button>
          {Object.keys(formErrors).length === 0 && onSubmit && (
            <div className="msg-ok">ログインに成功しました</div>
          )}
        </div>
      </form>
    </div>
  );
}
export default App;
