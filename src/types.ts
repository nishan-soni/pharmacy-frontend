export type MiscPurchaseType = {
  ID: number;
  Date: string;
  Quantity: number;
  Total: number;
  Patient_ID: number;
  Item_ID: number;
};

export type MedPurchaseType = {
  ID: number;
  Date: string;
  Total: number;
  Patient_ID: number;
  Item_ID: number;
  Insured: boolean;
  Quantity: number;
};

export type MiscType = {
  Item_ID: number;
  Name: string;
  Quantity: number;
  Price: number;
  Supp_ID: number;
};

export type MedType = {
  Item_ID: number;
  Name: string;
  Quantity: number;
  Price: number;
  Supp_ID: number;
  Exp_Date: string;
  Type_Of: string;
};

export type PatientType = {
  Fname: string;
  Lname: string;
  E_Address: string;
  Patient_ID: number;
  S_Address: string;
};

export type SuppType = {
  Supp_ID: number;
  Supp_Name: string;
  Address: string;
};

export type MedicineTypeType = {
  Type_Name: string;
  Form: string;
};

export type BillType = {
  Date: string;
  Amount: number;
  Pharmacist_ID: number;
  ID: number;
};

export type MedRestockType = {
  ID: number;
  Quantity: number;
  Date: string;
  Med_ID: number;
  Supp_ID: number;
};

export type MiscRestockType = {
  id: number;
  Quantity: number;
  Date: string;
  Misc_ID: number;
  Supp_ID: number;
};

export type PrescType = {
  ID: number;
  Descrip: string;
  Date: string;
  DocName: string;
  FilledBy: number;
  PrescTo: number;
  Quantity: number;
  Unit_Of_Meas: number;
  Med_ID: number;
};

export type PharmType = {
  Full_Name: number;
  Pharmacist_ID: number;
};

export type ContractType = {
  contractID: number;
  Start_Date: string;
  End_Date: string;
  Cont_With: string;
};
