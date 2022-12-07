import axios from "axios";
import { useEffect, useState } from "react";
import { MedicineTypeType, MedType, MiscType, SuppType } from "../types";
import { routes } from "../util/routes";
import Modal from "./Modal";

export default function Items() {
  const [viewMedicine, setViewMedicine] = useState(false);
  const [medicine, setMedicine] = useState<MedType[]>([]);
  const [misc, setMisc] = useState<MiscType[]>([]);
  const [suppliers, setSuppliers] = useState<SuppType[]>([]);
  const [addItem, setAddItem] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [editItemData, setEditItemData] = useState<any>({});
  const [medTypes, setMedTypes] = useState<MedicineTypeType[]>([]);

  useEffect(() => {
    async function getMed() {
      const response = await axios.get(`${routes.API_URL}/medicine`);
      setMedicine(response.data);
    }
    async function getMisc() {
      const response = await axios.get(`${routes.API_URL}/misc`);
      setMisc(response.data);
      console.log(response.data);
    }
    async function getSupp() {
      const response = await axios.get(`${routes.API_URL}/suppliers`);
      setSuppliers(response.data);
    }
    async function getMedTypes() {
      const response = await axios.get(`${routes.API_URL}/medtypes`);
      setMedTypes(response.data);
    }
    getMed();
    getMisc();
    getSupp();
    getMedTypes();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="text-2xl">View Items</div>
      <div className="flex flex-row p-3 gap-3 border rounded shadow-sm">
        <button
          onClick={() => {
            setViewMedicine(false);
          }}
        >
          View Misc Items
        </button>
        <button
          onClick={() => {
            setViewMedicine(true);
          }}
        >
          View Medicine Items
        </button>
      </div>

      <div className="w-full p-8 flex flex-col gap-3 items-center">
        <div className="text-2xl">
          {viewMedicine ? "Medicine Items" : "Misc Items"}
        </div>

        {viewMedicine === false ? (
          <div className="w-full flex flex-col items-center gap-3">
            <table className="border rounded shadow w-full">
              <thead>
                <tr className="text-lg h-10">
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Supplier</th>
                </tr>
              </thead>
              <tbody>
                {misc.map((item) => {
                  return (
                    <tr
                      key={item.Item_ID}
                      onClick={() => {
                        setEditItem(true);
                        setEditItemData(item);
                      }}
                      className="text-lg text-center cursor-pointer h-10 border-t"
                    >
                      <td>{item.Name}</td>
                      <td>{item.Quantity}</td>
                      <td>${item.Price}</td>
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
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Supplier</th>
                  <th>Type of</th>
                </tr>
              </thead>
              <tbody>
                {medicine.map((item) => {
                  return (
                    <tr
                      key={item.Item_ID}
                      onClick={() => {
                        setEditItem(true);
                        setEditItemData(item);
                      }}
                      className="text-lg text-center cursor-pointer h-10 border-t"
                    >
                      <td>{item.Name}</td>
                      <td>{item.Quantity}</td>
                      <td>${item.Price}</td>
                      <td>
                        {suppliers.map((p) => {
                          if (p.Supp_ID === item.Supp_ID) {
                            return p.Supp_Name;
                          }
                          return "";
                        })}
                      </td>
                      <td>{item.Type_Of}</td>
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
          Add an item
        </button>
      </div>
      {addItem || editItem ? (
        <Modal>
          <div>Add/Edit Item</div>
          <div>Name</div>
          <input
            value={editItemData.Name}
            type="text"
            onChange={(e) => {
              setEditItemData({
                ...editItemData,
                Name: e.target.value,
              });
            }}
            className="border"
          />
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
          <div>Price</div>
          <input
            value={editItemData.Price}
            type="number"
            onChange={(e) => {
              setEditItemData({
                ...editItemData,
                Price: parseInt(e.target.value),
              });
            }}
            className="border"
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

          {viewMedicine ? (
            <div>
              <div>Select a Medicine Type</div>
              <select
                value={editItemData.Type_Name}
                onChange={(e) => {
                  setEditItemData({
                    ...editItemData,
                    Type_Of: e.target.value,
                  });
                }}
              >
                <option value={undefined}>Select</option>
                {medTypes.map((item) => {
                  return (
                    <option key={item.Type_Name} value={item.Type_Name}>
                      {item.Type_Name}, {item.Form}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}
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
                        `${routes.API_URL}/medicine/${editItemData.Item_ID}`
                      );
                    } else {
                      axios.delete(
                        `${routes.API_URL}/misc/${editItemData.Item_ID}`
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
                    axios.post(`${routes.API_URL}/medicine/`, {
                      ...editItemData,
                    });
                  } else {
                    axios.post(
                      `${routes.API_URL}/medicine/${editItemData.Item_ID}`,
                      {
                        ...editItemData,
                      }
                    );
                  }
                } else {
                  if (addItem) {
                    axios.post(`${routes.API_URL}/misc/`, {
                      ...editItemData,
                    });
                  } else {
                    axios.post(
                      `${routes.API_URL}/misc/${editItemData.Item_ID}`,
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
