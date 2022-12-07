import axios from "axios";
import { useEffect, useState } from "react";
import {
  MedPurchaseType,
  MedType,
  MiscPurchaseType,
  MiscType,
  PatientType,
} from "../types";
import { routes } from "../util/routes";

export default function Purchases() {
  const [medPurchases, setMedPurchases] = useState<MedPurchaseType[]>([]);
  const [miscPurchases, setMiscPurchases] = useState<MiscPurchaseType[]>([]);
  const [viewMedPurchases, setViewMedPurchases] = useState(false);
  const [addPurchase, setAddPurchase] = useState(false);
  const [editPurchase, setEditPurchase] = useState(false);
  const [editPurchaseData, setEditPurchaseData] = useState<
    MedPurchaseType | MiscPurchaseType | any
  >({});
  const [miscItems, setMiscItems] = useState<MiscType[]>([]);
  const [medItems, setMedItems] = useState<MedType[]>([]);
  const [patients, setPatients] = useState<PatientType[]>([]);

  async function getMiscPurchases() {
    const response = await axios.get(`${routes.API_URL}/miscpurchases`);
    for (let i = 0; i < response.data.length; i++) {
      response.data[i].Date = response.data[i].Date.split("T")[0];
    }
    setMiscPurchases(response.data.reverse());
  }
  async function getMedPurchases() {
    const response = await axios.get(`${routes.API_URL}/medpurchases`);
    for (let i = 0; i < response.data.length; i++) {
      response.data[i].Date = response.data[i].Date.split("T")[0];
    }
    setMedPurchases(response.data.reverse());
  }
  async function getMiscItems() {
    const response = await axios.get(`${routes.API_URL}/misc`);
    setMiscItems(response.data);
  }
  async function getMedItems() {
    const response = await axios.get(`${routes.API_URL}/medicine`);
    setMedItems(response.data);
  }
  async function getPatients() {
    const response = await axios.get(`${routes.API_URL}/patients`);
    setPatients(response.data);
  }

  useEffect(() => {
    getMiscPurchases();
    getMedPurchases();
    getMiscItems();
    getMedItems();
    getPatients();
  }, []);
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="text-2xl">View Purchases</div>
      <div className="flex flex-col gap-2 w-full items-center">
        <div className="flex flex-row p-3 gap-3 border rounded shadow-sm">
          <button
            onClick={() => {
              setViewMedPurchases(false);
            }}
          >
            View Misc Purchases
          </button>
          <button
            onClick={() => {
              setViewMedPurchases(true);
            }}
          >
            View Medicine Purchases
          </button>
        </div>
        <div className="w-full p-8 flex flex-col items-center">
          <div className="text-2xl">
            {viewMedPurchases ? "Medicine Purchases" : "Misc Purchases"}
          </div>

          {viewMedPurchases === false ? (
            <div className="w-full flex flex-col items-center gap-3">
              <table className="border rounded shadow w-full">
                <thead>
                  <tr className="text-lg h-10">
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Patient</th>
                  </tr>
                </thead>
                <tbody>
                  {miscPurchases.map((item) => {
                    return (
                      <tr
                        key={item.ID}
                        onClick={() => {
                          setEditPurchase(true);
                          setEditPurchaseData(item);
                        }}
                        className="text-lg h-10 text-center cursor-pointer border-t"
                      >
                        <td>
                          {miscItems.map((i) => {
                            if (i.Item_ID === item.Item_ID) {
                              return i.Name;
                            }
                            return "";
                          })}
                        </td>
                        <td>{item.Quantity}</td>
                        <td>{item.Date}</td>
                        <td>${item.Total}</td>
                        <td>
                          {patients.map((i) => {
                            if (i.Patient_ID === item.Patient_ID) {
                              return `${i.Fname} ${i.Lname}`;
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
                  setAddPurchase(true);
                }}
              >
                Add a purchase
              </button>
            </div>
          ) : null}
          {viewMedPurchases ? (
            <div className="w-full flex flex-col items-center gap-2">
              <table className="border rounded shadow w-full">
                <thead>
                  <tr className="text-lg h-10">
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Insured</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Patient</th>
                  </tr>
                </thead>
                <tbody>
                  {medPurchases.map((item) => {
                    return (
                      <tr
                        onClick={() => {
                          console.log(item);
                          setEditPurchase(true);
                          setEditPurchaseData(item);
                        }}
                        className="text-lg text-center h-10 cursor-pointer border-t"
                      >
                        <td>
                          {medItems.map((i) => {
                            if (i.Item_ID === item.Item_ID) {
                              return i.Name;
                            }
                            return "";
                          })}
                        </td>
                        <td>{item.Quantity}</td>
                        <td>{item.Insured}</td>
                        <td>{item.Date}</td>
                        <td>${item.Total}</td>
                        <td>
                          {patients.map((i) => {
                            if (i.Patient_ID === item.Patient_ID) {
                              return `${i.Fname} ${i.Lname}`;
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
                  setAddPurchase(true);
                }}
              >
                Add a purchase
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {addPurchase || editPurchase ? (
        <div className="w-full h-full fixed flex items-center justify-center z-20">
          <div className="w-4/5 h-4/5 p-8 modal fixed bg-white border shadow flex flex-col gap-3 items-center">
            <div>Select an Item</div>
            {viewMedPurchases ? (
              <select
                value={editPurchaseData.Item_ID}
                onChange={(e) => {
                  setEditPurchaseData({
                    ...editPurchaseData,
                    Item_ID: parseInt(e.target.value),
                  });
                }}
              >
                <option value={undefined}>Select</option>
                {medItems.map((item) => {
                  return (
                    <option key={item.Item_ID} value={item.Item_ID}>
                      {item.Name}
                    </option>
                  );
                })}
              </select>
            ) : (
              <select
                value={editPurchaseData.Item_ID}
                onChange={(e) => {
                  setEditPurchaseData({
                    ...editPurchaseData,
                    Item_ID: parseInt(e.target.value),
                  });
                }}
              >
                <option value={undefined}>Select</option>
                {miscItems.map((item) => {
                  return (
                    <option key={item.Item_ID} value={item.Item_ID}>
                      {item.Name}
                    </option>
                  );
                })}
              </select>
            )}
            <div>Quantity</div>
            <input
              value={editPurchaseData.Quantity}
              type="number"
              onChange={(e) => {
                setEditPurchaseData({
                  ...editPurchaseData,
                  Quantity: parseInt(e.target.value),
                });
              }}
              className="border"
            />

            <div>Total</div>
            <input
              value={editPurchaseData.Total}
              className="border"
              type="number"
              onChange={(e) => {
                setEditPurchaseData({
                  ...editPurchaseData,
                  Total: parseInt(e.target.value),
                });
              }}
            />

            {viewMedPurchases ? (
              <div>
                Insured?
                <select
                  value={editPurchaseData.Insured}
                  onChange={(e) => {
                    let insured = false;
                    if (e.target.value === "true") {
                      insured = true;
                    }
                    setEditPurchaseData({
                      ...editPurchaseData,
                      Insured: insured,
                    });
                  }}
                >
                  <option value={undefined}>Select</option>
                  <option key={"true"} value={"true"}>
                    Yes
                  </option>
                  <option key={"false"} value={"false"}>
                    No
                  </option>
                </select>
              </div>
            ) : null}
            <div>Patient</div>
            <select
              value={editPurchaseData.Patient_ID}
              onChange={(e) => {
                setEditPurchaseData({
                  ...editPurchaseData,
                  Patient_ID: parseInt(e.target.value),
                });
              }}
            >
              <option value={undefined}>Select</option>
              {patients.map((item) => {
                return (
                  <option
                    value={item.Patient_ID}
                    key={item.Patient_ID}
                  >{`${item.Fname} ${item.Lname}`}</option>
                );
              })}
            </select>
            <div>Date</div>
            <input
              type="date"
              value={editPurchaseData.Date}
              onChange={(e) => {
                setEditPurchaseData({
                  ...editPurchaseData,
                  Date: e.target.value,
                });
              }}
            />
            <div className="flex flex-row gap-2">
              <button
                className="border rounded"
                onClick={() => {
                  setAddPurchase(false);
                  setEditPurchase(false);
                  setEditPurchaseData({});
                }}
              >
                Cancel
              </button>
              {editPurchase ? (
                <button
                  className="border rounded text-red-500"
                  onClick={() => {
                    const result = window.confirm("Delete this Purchase?");
                    if (result) {
                      if (viewMedPurchases) {
                        axios.delete(
                          `${routes.API_URL}/medpurchases/${editPurchaseData.ID}`
                        );
                      } else {
                        axios.delete(
                          `${routes.API_URL}/miscpurchases/${editPurchaseData.ID}`
                        );
                      }
                      setEditPurchase(false);
                      setEditPurchaseData({});
                    }
                  }}
                >
                  Delete
                </button>
              ) : null}

              <button
                className="border rounded"
                onClick={() => {
                  if (viewMedPurchases) {
                    if (addPurchase) {
                      axios.post(`${routes.API_URL}/medpurchases/`, {
                        ...editPurchaseData,
                      });
                    } else {
                      axios.post(
                        `${routes.API_URL}/medpurchases/${editPurchaseData.ID}`,
                        {
                          ...editPurchaseData,
                        }
                      );
                    }
                    getMedPurchases();
                  } else {
                    if (addPurchase) {
                      axios.post(`${routes.API_URL}/miscpurchases/`, {
                        ...editPurchaseData,
                      });
                    } else {
                      axios.post(
                        `${routes.API_URL}/miscpurchases/${editPurchaseData.ID}`,
                        {
                          ...editPurchaseData,
                        }
                      );
                    }
                    getMiscPurchases();
                  }
                  setAddPurchase(false);
                  setEditPurchase(false);
                  window.alert("Refresh to see changes.");
                  setEditPurchaseData({});
                }}
              >
                {addPurchase ? "Add Purchase" : "Update Purchase"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
