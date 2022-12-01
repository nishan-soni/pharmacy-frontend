import axios from "axios";
import { useEffect, useState } from "react";
import { routes } from "../util/routes";

export default function Purchases() {
  const [users, setUsers] = useState();
  const [miscPurchases, setMiscPurchases] = useState();

  useEffect(() => {
    async function getMiscPurchases() {
      const response = await axios.get(`${routes.API_URL}/miscpurchases`);
      setMiscPurchases(response.data);
      console.log(response.data);
    }
    getMiscPurchases();
  }, []);
  return (
    <div>
      <div>Purchases</div>
      <div className="flex flex-row gap 6 items-center">
        <div>
          <div>Misc Purchases</div>
          <table className="border rounded shadow">
            <thead className="">
              <tr>
                <th className="text-left">Date</th>
                <th className="text-left">Quantity</th>
                <th className="text-left">Total</th>
                <th className="text-left">Patient</th>
                <th className="text-left">Item</th>
              </tr>
            </thead>
          </table>
        </div>
        <div>
          <div>Medicine Purchases</div>
          <table>
            <thead>
              <tr></tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
}
