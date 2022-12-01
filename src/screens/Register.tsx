import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hasJWT } from "../util/hasJWT";
import { register } from "../util/authServices";

export default function Register() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [pharmID, setPharmID] = useState<string>();

  // Checking if user is already logged in
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
        <div className="text-2xl font-semibold">Sign up</div>
        <input
          type="text"
          className="text-lg"
          placeholder="Full Name"
          autoComplete="on"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
        <input
          className="text-lg"
          placeholder="Address"
          type="text"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <div>
          <input
            className="text-lg"
            placeholder="Pharmacist ID"
            type="text"
            onChange={(e) => {
              setPharmID(e.target.value);
            }}
          />
          <div className="text-xs">
            Leave blank if registering as an employee.
          </div>
        </div>
        <div className="flex flex-row gap-3 m-auto">
          <button
            onClick={async () => {
              const data = {
                Full_Name: name,
                E_Address: email,
                Password: password,
                S_Address: address,
                Pharmacist_ID: pharmID,
              };
              const registered = await register(data);
              console.log("Registered");
              setAuthenticated(registered);
            }}
            className="border p-2 text-xs"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
