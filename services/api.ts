import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export interface Documento {
  id?: string;
  nome: string;
  dataVencimento: string;
}

export interface Mortalidade {
  id?: string;
  data: string;
  quantidade: number;
  causa: string;
}

export const api = {
  // ---------- DOCUMENTOS ----------
  async getDocumentos(): Promise<Documento[]> {
    const querySnapshot = await getDocs(collection(db, "documentos"));
    return querySnapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    })) as Documento[];
  },

  async addDocumento(doc: Omit<Documento, "id">): Promise<Documento> {
    const docRef = await addDoc(collection(db, "documentos"), doc);
    return { id: docRef.id, ...doc };
  },

  async deleteDocumento(id: string) {
    await deleteDoc(doc(db, "documentos", id));
  },

  async updateDocumento(id: string, dados: Partial<Documento>) {
    await updateDoc(doc(db, "documentos", id), dados);
  },

  // ---------- MORTALIDADE ----------
  async getMortalidades(): Promise<Mortalidade[]> {
    const querySnapshot = await getDocs(collection(db, "mortalidade"));
    return querySnapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    })) as Mortalidade[];
  },

  async addMortalidade(reg: Omit<Mortalidade, "id">): Promise<Mortalidade> {
    const docRef = await addDoc(collection(db, "mortalidade"), reg);
    return { id: docRef.id, ...reg };
  },

  async deleteMortalidade(id: string) {
    await deleteDoc(doc(db, "mortalidade", id));
  },

  async updateMortalidade(id: string, dados: Partial<Mortalidade>) {
    await updateDoc(doc(db, "mortalidade", id), dados);
  },
};