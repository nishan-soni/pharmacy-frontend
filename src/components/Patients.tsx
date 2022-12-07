import axios from "axios";
import { useEffect, useState } from "react";
import { MedType, PatientType, PharmType, PrescType } from "../types";
import { routes } from "../util/routes";
import Modal from "./Modal";
export default function Patients() {
  const [selectedPatient, setSelectedPatient] = useState<number>();
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [editPatient, setEditPatient] = useState(false);
  const [addPatient, setAddPatient] = useState(false);
  const [editItemData, setEditItemData] = useState<any>({});
  const [prescriptions, setPrescriptions] = useState<PrescType[]>([]);
  const [editPrescription, setEditPrescription] = useState(false);
  const [addPrescription, setAddPrescription] = useState(false);
  const [medItems, setMedItems] = useState<MedType[]>([]);
  const [pharmacists, setPharmacists] = useState<PharmType[]>([]);

  useEffect(() => {
    async function getPatients() {
      const response = await axios.get(`${routes.API_URL}/patients`);
      setPatients(response.data);
    }

    async function getMed() {
      const response = await axios.get(`${routes.API_URL}/medicine`);
      setMedItems(response.data);
    }

    async function getPharm() {
      const response = await axios.get(`${routes.API_URL}/pharmacists`);
      setPharmacists(response.data);
    }

    getPatients();
    getMed();
    getPharm();
  }, []);

  useEffect(() => {
    async function getPresc() {
      const response = await axios.get(
        `${routes.API_URL}/patients/${selectedPatient}/prescriptions`
      );
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].Date = response.data[i].Date.split("T")[0];
      }
      setPrescriptions(response.data.reverse());
    }
    getPresc();
  }, [selectedPatient]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex-1 w-full p-8 flex flex-col gap-3 items-center">
        <div className="text-2xl">View Patients</div>
        <table className="border rounded shadow w-full">
          <thead>
            <tr className="text-lg h-10">
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((item) => {
              return (
                <tr
                  key={item.Patient_ID}
                  onClick={() => {
                    setEditPatient(true);
                    setEditItemData(item);
                  }}
                  className="text-lg text-center  h-10 cursor-pointer border-t"
                >
                  <td>{item.Fname}</td>
                  <td>{item.Lname}</td>
                  <td>{item.E_Address}</td>
                  <td>{item.S_Address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          className="border rounded p-1"
          onClick={() => {
            setAddPatient(true);
          }}
        >
          Add Patient
        </button>
      </div>
      {addPatient || editPatient ? (
        <Modal>
          <div>First Name</div>
          <input
            value={editItemData.Fname}
            className="rounded border"
            type="text"
            onChange={(e) => {
              setEditItemData({ ...editItemData, Fname: e.target.value });
            }}
          />
          <div>Last Name</div>
          <input
            value={editItemData.Lname}
            className="rounded border"
            type="text"
            onChange={(e) => {
              setEditItemData({ ...editItemData, Lname: e.target.value });
            }}
          />
          <div>Email Address</div>
          <input
            value={editItemData.E_Address}
            className="rounded border"
            type="text"
            onChange={(e) => {
              setEditItemData({ ...editItemData, E_Address: e.target.value });
            }}
          />
          <div>Street Address</div>
          <input
            value={editItemData.S_Address}
            className="rounded border"
            type="text"
            onChange={(e) => {
              setEditItemData({ ...editItemData, S_Address: e.target.value });
            }}
          />

          <div className="flex flex-row gap-2">
            <button
              className="border rounded"
              onClick={() => {
                setAddPatient(false);
                setEditPatient(false);
                setEditItemData({});
              }}
            >
              Cancel
            </button>
            {editPatient ? (
              <button
                className="border rounded text-red-500"
                onClick={() => {
                  const result = window.confirm("Delete?");
                  if (result) {
                    axios.delete(
                      `${routes.API_URL}/patients/${editItemData.Patient_ID}`
                    );
                    setEditPatient(false);
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
                if (addPatient) {
                  axios.post(`${routes.API_URL}/patients/`, {
                    ...editItemData,
                  });
                } else {
                  axios.post(
                    `${routes.API_URL}/patients/${editItemData.Patient_ID}`,
                    {
                      ...editItemData,
                    }
                  );
                }
                setAddPatient(false);
                setEditPatient(false);
                window.alert("Refresh to see changes.");
                setEditItemData({});
              }}
            >
              {addPatient ? "Add" : "Update"}
            </button>
          </div>
        </Modal>
      ) : null}

      <div className="flex-1 w-full p-8 flex flex-col gap-3 items-center">
        <div className="text-2xl">Prescriptions for:</div>
        <select
          value={selectedPatient}
          onChange={(e) => {
            setSelectedPatient(parseInt(e.target.value));
          }}
        >
          <option value={undefined}>Select</option>
          {patients.map((item) => {
            return (
              <option key={item.Patient_ID} value={item.Patient_ID}>
                {item.Fname} {item.Lname}
              </option>
            );
          })}
        </select>
        <table className="border rounded shadow w-full overflow-scroll">
          <thead>
            <tr className="text-lg  h-10">
              <th>Date</th>
              <th>Doctor</th>
              <th>Filled By</th>
              <th>Medicine</th>
              <th>Quantity</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((item) => {
              return (
                <tr
                  key={item.ID}
                  onClick={() => {
                    setEditPrescription(true);
                    setEditItemData(item);
                    console.log(item);
                  }}
                  className="text-lg text-center cursor-pointer border-t h-10"
                >
                  <td>{item.Date}</td>
                  <td>{item.DocName}</td>
                  <td>
                    {pharmacists.map((p) => {
                      if (p.Pharmacist_ID === item.FilledBy) {
                        return p.Full_Name;
                      }
                      return "";
                    })}
                  </td>
                  <td>{item.Med_ID}</td>
                  <td>{item.Quantity}</td>
                  <td>{item.Unit_Of_Meas}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {selectedPatient ? (
          <button
            className="border rounded p-1"
            onClick={() => {
              setAddPrescription(true);
            }}
          >
            Add Prescription
          </button>
        ) : null}
      </div>
      {editPrescription || addPrescription ? (
        <Modal>
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
          <div>Doctor Name</div>
          <input
            type="text"
            value={editItemData.DocName}
            onChange={(e) => {
              setEditItemData({
                ...editItemData,
                DocName: e.target.value,
              });
            }}
          />
          <div>Filled by:</div>
          <select
            value={editItemData.FilledBy}
            onChange={(e) => {
              setEditItemData({
                ...editItemData,
                FilledBy: e.target.value,
              });
            }}
          >
            <option value={undefined}>Select</option>
            {pharmacists.map((item) => {
              return (
                <option key={item.Pharmacist_ID} value={item.Pharmacist_ID}>
                  {item.Full_Name}
                </option>
              );
            })}
          </select>
          <div>Select Medicine</div>
          <select
            value={editItemData.Item_ID}
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

          <div>Quantity</div>
          <input
            type="number"
            value={editItemData.Quantity}
            onChange={(e) => {
              setEditItemData({
                ...editItemData,
                Quantity: e.target.value,
              });
            }}
          />

          <div>Units</div>
          <input
            type="text"
            value={editItemData.Unit_Of_Meas}
            onChange={(e) => {
              setEditItemData({
                ...editItemData,
                Unit_Of_Meas: e.target.value,
              });
            }}
          />

          <div>Description</div>
          <input
            type="textarea"
            value={editItemData.Desc}
            onChange={(e) => {
              setEditItemData({
                ...editItemData,
                Desc: e.target.value,
              });
            }}
          />

          <div className="flex flex-row gap-2">
            <button
              className="border rounded"
              onClick={() => {
                setAddPrescription(false);
                setEditPrescription(false);
                setEditItemData({});
              }}
            >
              Cancel
            </button>
            {editPrescription ? (
              <button
                className="border rounded text-red-500"
                onClick={() => {
                  const result = window.confirm("Delete?");
                  if (result) {
                    axios.delete(
                      `${routes.API_URL}/prescriptions/${editItemData.ID}`
                    );

                    setEditPrescription(false);
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
                if (addPrescription) {
                  axios.post(`${routes.API_URL}/prescriptions/`, {
                    ...editItemData,
                    PrescTo: selectedPatient,
                  });
                } else {
                  axios.post(
                    `${routes.API_URL}/prescriptions/${editItemData.ID}`,
                    {
                      ...editItemData,
                    }
                  );
                }
                setAddPrescription(false);
                setEditPrescription(false);
                window.alert("Refresh to see changes.");
                setEditItemData({});
              }}
            >
              {addPrescription ? "Add" : "Update"}
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
