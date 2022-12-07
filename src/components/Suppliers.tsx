import axios from "axios";
import { useEffect, useState } from "react";
import { ContractType, SuppType } from "../types";
import { routes } from "../util/routes";
import Modal from "./Modal";
export default function Suppliers() {
  const [selectedSupplier, setSelectedSupplier] = useState<number>();
  const [suppliers, setSuppliers] = useState<SuppType[]>([]);
  const [editSupplier, setEditSupplier] = useState(false);
  const [addSupplier, setAddSupplier] = useState(false);
  const [editItemData, setEditItemData] = useState<any>({});
  const [contract, setContract] = useState<ContractType[]>([]);
  const [editContract, setEditContract] = useState(false);
  const [addContract, setAddContract] = useState(false);

  useEffect(() => {
    async function getSuppliers() {
      const response = await axios.get(`${routes.API_URL}/suppliers`);
      setSuppliers(response.data);
    }

    getSuppliers();
  }, []);

  useEffect(() => {
    async function getContracts() {
      const response = await axios.get(
        `${routes.API_URL}/suppliers/${selectedSupplier}/contracts`
      );
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].Start_Date = response.data[i].Start_Date.split("T")[0];
        response.data[i].End_Date = response.data[i].End_Date.split("T")[0];
      }
      setContract(response.data.reverse());
    }
    getContracts();
  }, [selectedSupplier]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full p-8 flex flex-col gap-3 items-center">
        <div className="text-2xl">View Suppliers</div>
        <table className="border rounded shadow w-full">
          <thead>
            <tr className="text-lg h-10">
              <th>Name</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((item) => {
              return (
                <tr
                  key={item.Supp_ID}
                  onClick={() => {
                    setEditSupplier(true);
                    setEditItemData(item);
                  }}
                  className="text-lg text-center cursor-pointer h-10 border-t"
                >
                  <td>{item.Supp_Name}</td>
                  <td>{item.Address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          className="border rounded p-1"
          onClick={() => {
            setAddSupplier(true);
          }}
        >
          Add Supplier
        </button>
      </div>
      {addSupplier || editSupplier ? (
        <Modal>
          <div>Supplier Name</div>
          <input
            value={editItemData.Supp_Name}
            className="rounded border"
            type="text"
            onChange={(e) => {
              setEditItemData({ ...editItemData, Supp_Name: e.target.value });
            }}
          />
          <div>Supplier Address</div>
          <input
            value={editItemData.Address}
            className="rounded border"
            type="text"
            onChange={(e) => {
              setEditItemData({ ...editItemData, Address: e.target.value });
            }}
          />
          <div className="flex flex-row gap-2">
            <button
              className="border rounded"
              onClick={() => {
                setAddSupplier(false);
                setEditSupplier(false);
                setEditItemData({});
              }}
            >
              Cancel
            </button>
            {editSupplier ? (
              <button
                className="border rounded text-red-500"
                onClick={() => {
                  const result = window.confirm("Delete?");
                  if (result) {
                    axios.delete(
                      `${routes.API_URL}/suppliers/${editItemData.Supp_ID}`
                    );
                    setEditSupplier(false);
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
                if (addSupplier) {
                  axios.post(`${routes.API_URL}/suppliers/`, {
                    ...editItemData,
                  });
                } else {
                  axios.post(
                    `${routes.API_URL}/suppliers/${editItemData.Supp_ID}`,
                    {
                      ...editItemData,
                    }
                  );
                }
                setAddSupplier(false);
                setEditSupplier(false);
                window.alert("Refresh to see changes.");
                setEditItemData({});
              }}
            >
              {addSupplier ? "Add" : "Update"}
            </button>
          </div>
        </Modal>
      ) : null}

      <div className="w-full p-8 flex flex-col gap-3 items-center">
        <div className="text-2xl">Contracts for: </div>
        <select
          value={selectedSupplier}
          onChange={(e) => {
            setSelectedSupplier(parseInt(e.target.value));
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
        <table className="border rounded shadow w-full">
          <thead>
            <tr className="text-lg h-10">
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {contract.map((item) => {
              return (
                <tr
                  key={item.contractID}
                  onClick={() => {
                    setEditContract(true);
                    setEditItemData(item);
                    console.log(item);
                  }}
                  className="text-lg text-center cursor-pointer border-t h-10"
                >
                  <td>{item.Start_Date}</td>
                  <td>{item.End_Date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {selectedSupplier ? (
          <button
            className="border rounded p-1"
            onClick={() => {
              setAddContract(true);
            }}
          >
            Add Contract
          </button>
        ) : null}
      </div>
      {editContract || addContract ? (
        <Modal>
          <div>Start Date</div>
          <input
            type="date"
            value={editItemData.Start_Date}
            onChange={(e) => {
              setEditItemData({
                ...editItemData,
                Start_Date: e.target.value,
              });
            }}
          />

          <div>End Date</div>
          <input
            type="date"
            value={editItemData.End_Date}
            onChange={(e) => {
              setEditItemData({
                ...editItemData,
                End_Date: e.target.value,
              });
            }}
          />

          <div className="flex flex-row gap-2">
            <button
              className="border rounded"
              onClick={() => {
                setAddContract(false);
                setEditContract(false);
                setEditItemData({});
              }}
            >
              Cancel
            </button>
            {editContract ? (
              <button
                className="border rounded text-red-500"
                onClick={() => {
                  const result = window.confirm("Delete?");
                  if (result) {
                    axios.delete(
                      `${routes.API_URL}/contracts/${editItemData.contractID}`
                    );

                    setEditContract(false);
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
                if (addContract) {
                  axios.post(`${routes.API_URL}/contracts/`, {
                    ...editItemData,
                    Cont_With: selectedSupplier,
                  });
                } else {
                  axios.post(
                    `${routes.API_URL}/contracts/${editItemData.contractID}`,
                    {
                      ...editItemData,
                    }
                  );
                }
                setAddContract(false);
                setEditContract(false);
                window.alert("Refresh to see changes.");
                setEditItemData({});
              }}
            >
              {addContract ? "Add" : "Update"}
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
