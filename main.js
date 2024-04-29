import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
  }
  from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
  
const firebaseConfig = {
  apiKey: "AIzaSyCRlnLBhUHGOF7Lfg9iy_SbfK6coM_7f1U",
  authDomain: "insan-cemerlang-6640c.firebaseapp.com",
  projectId: "insan-cemerlang-6640c",
  storageBucket: "insan-cemerlang-6640c.appspot.com",
  messagingSenderId: "917464283158",
  appId: "1:917464283158:web:3a6179cd71818d68f6dd37"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarPembeli() {
  const refDokumen = collection(db,"produk");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({  
      id: dok.id, 
    nama: dok.data().nama,
    alamat: dok.data().alamat,
    noTlpn: dok.data().noTlpn,
    });
  });
  return hasil;
}

export function formatAngka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function  tambahPembeli(nama, alamat, noTlpn) {
  try {
    const dokRef = await addDoc(collection(db, 'produk'),{
      nama: nama,
      alamat: alamat,
      noTlpn: noTlpn
    });
    console.log('Berhasil menambah pembeli' + dokRef.id);
  } catch (e) {
    Console.log('Gagal menambah pembeli' + e);
  }
export async function hapuspembeli(docId)
{
  await deleteDoc(doc(db,"Pembeli", docId));
}

export async function ubahpembeli(docId,nama, alamat, noTlpn) {
  await updateDoc(doc(db, "pembeli", docId),{
    nama: nama,
    alamat: alamat,
    noTlpn: noTlpn
  });
}
  
  export async function ambilpembeli(docid) {
    const docRef = await doc(db, "pembeli", docId);
    const docSnap = await getDoc(docRef);
    
    return await docSnap.date();
  }
}