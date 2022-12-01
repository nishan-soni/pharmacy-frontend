import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pharmacistLogin, employeeLogin } from "../util/authServices";
import { hasJWT } from "../util/hasJWT";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("Check authenticated");
    if (hasJWT()) {
      setAuthenticated(true);
    }
    if (authenticated) {
      navigate("/app");
    }
  }, [authenticated, navigate]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-5">
        <div className="text-2xl font-semibold">Login</div>
        <input
          className="text-lg"
          placeholder="Email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          className="text-lg"
          placeholder="Password"
          autoComplete="on"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="flex flex-row gap-3">
          <button
            onClick={async () => {
              const loggedin = await pharmacistLogin(email, password);
              setAuthenticated(loggedin);
            }}
            className="border p-2 text-xs"
          >
            Login as Pharmacist
          </button>
          <button
            onClick={async () => {
              const loggedin = await employeeLogin(email, password);
              setAuthenticated(loggedin);
            }}
            className="border p-2 text-xs"
          >
            Login as Employee
          </button>
        </div>
        <button
          className="text-sm text-gray-500"
          onClick={() => {
            navigate("register");
          }}
        >
          Create new account
        </button>
      </div>
    </div>
  );
}

export default Login;
