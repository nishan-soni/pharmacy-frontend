import axios from "axios";
import { useEffect, useState } from "react";
import { BillType, PharmType } from "../types";
import { routes } from "../util/routes";
import Modal from "./Modal";
import jwt_decode from "jwt-decode";

export default function Bills() {
  const [bills, setBills] = useState<BillType[]>([]);
  const [addItem, setAddItem] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [editItemData, setEditItemData] = useState<any>({});
  const [pharmacists, setPharmacists] = useState<PharmType[]>([]);

  useEffect(() => {
    async function getBills() {
      const response = await axios.get(`${routes.API_URL}/bills`);
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].Date = response.data[i].Date.split("T")[0];
      }
      setBills(response.data.reverse());
    }
    async function getPharm() {
      const response = await axios.get(`${routes.API_URL}/pharmacists`);
      setPharmacists(response.data);
    }
    getPharm();
    getBills();
  }, []);
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full p-8 flex flex-col gap-3 items-center">
        <div className="text-2xl">View Bills</div>
        <table className="border rounded shadow w-full">
          <thead>
            <tr className="text-lg h-10">
              <th>Date</th>
              <th>Amount</th>
              <th>Last Updated By</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((item) => {
              return (
                <tr
                  key={item.ID}
                  onClick={() => {
                    setEditItem(true);
                    setEditItemData(item);
                    console.log(item);
                  }}
                  className="text-lg text-center cursor-pointer border-t h-10"
                >
                  <td>{item.Date}</td>
                  <td>${item.Amount}</td>
                  <td>
                    {pharmacists.map((p) => {
                      if (p.Pharmacist_ID === item.Pharmacist_ID) {
                        return p.Full_Name;
                      }
                      return "";
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          className="border rounded p-1"
          onClick={() => {
            setAddItem(true);
          }}
        >
          Add bill
        </button>
      </div>
      {addItem || editItem ? (
        <Modal>
          <div>Bill Date</div>
          <input
            type="Date"
            value={editItemData.Date}
            onChange={(e) => {
              setEditItemData({
                ...editItemData,
                Date: e.target.value,
              });
            }}
          />
          <div>Amount</div>
          <input
            className="border rounded"
            type="number"
            value={editItemData.Amount}
            onChange={(e) => {
              setEditItemData({
                ...editItemData,
                Amount: parseInt(e.target.value),
              });
            }}
          />

          <div className="flex flex-row gap-2">
            <button
              className="border rounded"
              onClick={() => {
                setAddItem(false);
                setEditItem(false);
                setEditItemData({});
              }}
            >
              Cancel
            </button>
            {editItem ? (
              <button
                className="border rounded text-red-500"
                onClick={() => {
                  const result = window.confirm("Delete?");
                  if (result) {
                    axios.delete(`${routes.API_URL}/bills/${editItemData.ID}`);

                    setEditItem(false);
                    setEditItemData({});
                  }
                }}
              >
                Delete
              </button>
            ) : null}

            <button
              className="border rounded"
              onClick={() => {
                const token = localStorage.getItem("token");
                if (!token) {
                  return;
                }
                const decode: { Pharmacist_ID: string } = jwt_decode(token);
                if (addItem) {
                  axios.post(`${routes.API_URL}/bills/`, {
                    ...editItemData,
                    Pharmacist_ID: decode.Pharmacist_ID,
                  });
                } else {
                  axios.post(`${routes.API_URL}/bills/${editItemData.ID}`, {
                    ...editItemData,
                    Pharmacist_ID: decode.Pharmacist_ID,
                  });
                }
                setAddItem(false);
                setEditItem(false);
                window.alert("Refresh to see changes.");
                setEditItemData({});
              }}
            >
              {addItem ? "Add" : "Update"}
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
