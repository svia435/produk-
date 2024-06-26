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

export async function ambilDaftarProduk() {
  const refDokumen = collection(db,"produk");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({  
      id: dok.id, 
    nama: dok.data().nama,
    harga: dok.data().harga,
    stok: dok.data().stok,
    });
  });
  return hasil;
}

export function formatAngka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function  tambahProduk(nama, alamat, noTlpn) {
  try {
    const dokRef = await addDoc(collection(db, 'produk'),{
      nama: nama,
      harga: harga,
      stok: stok
    });
    console.log('Berhasil menambah produk' + dokRef.id);
  } catch (e) {
    Console.log('Gagal menambah produk' + e);
  }
}
export async function hapusProduk(docId)
{
  await deleteDoc(doc(db,"Produk", docId));
}

export async function ubahProduk(docId,nama, harga, stok) {
  await updateDoc(doc(db, "produk", docId),{
    nama: nama,
    harga: harga,
    stok: stok
  });
}
  
  export async function ambilProduk(docid) {
    const docRef = await doc(db, "produk", docId);
    const docSnap = await getDoc(docRef);
    
    return await docSnap.data();
  }
