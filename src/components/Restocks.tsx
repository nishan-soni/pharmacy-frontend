import axios from "axios";
import { useEffect, useState } from "react";
import {
  MedRestockType,
  MedType,
  MiscRestockType,
  MiscType,
  SuppType,
} from "../types";
import { routes } from "../util/routes";
import Modal from "./Modal";

export default function Restocks() {
  const [viewMedicine, setViewMedicine] = useState(false);
  const [medicine, setMedicine] = useState<MedRestockType[]>([]);
  const [misc, setMisc] = useState<MiscRestockType[]>([]);
  const [suppliers, setSuppliers] = useState<SuppType[]>([]);
  const [addItem, setAddItem] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [editItemData, setEditItemData] = useState<any>({});
  const [miscItems, setMiscItems] = useState<MiscType[]>([]);
  const [medItems, setMedItems] = useState<MedType[]>([]);

  useEffect(() => {
    async function getMed() {
      const response = await axios.get(`${routes.API_URL}/medrestocks`);
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].Date = response.data[i].Date.split("T")[0];
      }
      setMedicine(response.data.reverse());
    }
    async function getMisc() {
      const response = await axios.get(`${routes.API_URL}/miscrestocks`);
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].Date = response.data[i].Date.split("T")[0];
      }
      setMisc(response.data.reverse());
    }
    async function getSupp() {
      const response = await axios.get(`${routes.API_URL}/suppliers`);
      setSuppliers(response.data);
    }

    async function getMiscItems() {
      const response = await axios.get(`${routes.API_URL}/misc`);
      setMiscItems(response.data);
    }
    async function getMedItems() {
      const response = await axios.get(`${routes.API_URL}/medicine`);
      setMedItems(response.data);
    }

    getMed();
    getMisc();
    getSupp();
    getMedItems();
    getMiscItems();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="text-2xl">View Restocks</div>
      <div className="flex flex-row p-3 gap-3 border rounded shadow-sm">
        <button
          onClick={() => {
            setViewMedicine(false);
          }}
        >
          View Misc Restocks
        </button>
        <button
          onClick={() => {
            setViewMedicine(true);
          }}
        >
          View Medicine Restocks
        </button>
      </div>

      <div className="w-full p-8 flex gap-3 flex-col items-center">
        <div className="text-2xl">
          {viewMedicine ? "Medicine Restocks" : "Misc Restocks"}
        </div>

        {viewMedicine === false ? (
          <div className="w-full flex flex-col items-center gap-3">
            <table className="border rounded shadow w-full">
              <thead>
                <tr className="text-lg h-10">
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Supplier</th>
                </tr>
              </thead>
              <tbody>
                {misc.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      onClick={() => {
                        setEditItem(true);
                        setEditItemData(item);
                        console.log(item);
                      }}
                      className="text-lg h-10 text-center cursor-pointer border-t"
                    >
                      <td>{item.Misc_ID}</td>
                      <td>{item.Quantity}</td>
                      <td>{item.Date}</td>
                      <td>
                        {suppliers.map((p) => {
                          if (p.Supp_ID === item.Supp_ID) {
                            return p.Supp_Name;
                          }
                          return "";
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}

        {viewMedicine ? (
          <div className="w-full flex flex-col items-center gap-3">
            <table className="border rounded shadow w-full">
              <thead>
                <tr className="text-lg h-10">
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Supplier</th>
                </tr>
              </thead>
              <tbody>
                {medicine.map((item) => {
                  return (
                    <tr
                      key={item.ID}
                      onClick={() => {
                        setEditItem(true);
                        setEditItemData(item);
                        console.log(item);
                      }}
                      className="text-lg text-center h-10 cursor-pointer border-t"
                    >
                      <td>{item.Med_ID}</td>
                      <td>{item.Quantity}</td>
                      <td>{item.Date}</td>
                      <td>
                        {suppliers.map((p) => {
                          if (p.Supp_ID === item.Supp_ID) {
                            return p.Supp_Name;
                          }
                          return "";
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
        <button
          className="border rounded p-1"
          onClick={() => {
            setAddItem(true);
          }}
        >
          Add a restock
        </button>
      </div>
      {addItem || editItem ? (
        <Modal>
          <div>Add/Edit Restock</div>
          <div>Item</div>
          {viewMedicine ? (
            <select
              value={editItemData.Med_ID}
              onChange={(e) => {
                setEditItemData({
                  ...editItemData,
                  Med_ID: parseInt(e.target.value),
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
              value={editItemData.Misc_ID}
              onChange={(e) => {
                setEditItemData({
                  ...editItemData,
                  Misc_ID: parseInt(e.target.value),
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
            value={editItemData.Quantity}
            type="number"
            onChange={(e) => {
              setEditItemData({
                ...editItemData,
                Quantity: parseInt(e.target.value),
              });
            }}
            className="border"
          />
          <div>Date</div>
          <input
            type="date"
            value={editItemData.Date}
            onChange={(e) => {
              setEditItemData({
                ...editItemData,
                Date: e.target.value,
              });
            }}
          />
          <div>Select a Supplier</div>
          <select
            value={editItemData.Supp_ID}
            onChange={(e) => {
              setEditItemData({
                ...editItemData,
                Supp_ID: parseInt(e.target.value),
              });
            }}
          >
            <option value={undefined}>Select</option>
            {suppliers.map((item) => {
              return (
                <option key={item.Supp_ID} value={item.Supp_ID}>
                  {item.Supp_Name}
                </option>
              );
            })}
          </select>

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
                    if (viewMedicine) {
                      axios.delete(
                        `${routes.API_URL}/medrestocks/${editItemData.ID}`
                      );
                    } else {
                      axios.delete(
                        `${routes.API_URL}/miscrestocks/${editItemData.id}`
                      );
                    }
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
                if (viewMedicine) {
                  if (addItem) {
                    console.log(editItemData);
                    axios.post(`${routes.API_URL}/medrestocks/`, {
                      ...editItemData,
                    });
                  } else {
                    axios.post(
                      `${routes.API_URL}/medrestocks/${editItemData.ID}`,
                      {
                        ...editItemData,
                      }
                    );
                  }
                } else {
                  if (addItem) {
                    console.log(editItemData);
                    axios.post(`${routes.API_URL}/miscrestocks/`, {
                      ...editItemData,
                    });
                  } else {
                    axios.post(
                      `${routes.API_URL}/miscrestocks/${editItemData.id}`,
                      {
                        ...editItemData,
                      }
                    );
                  }
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
