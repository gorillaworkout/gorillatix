// import { NextRequest, NextResponse } from "next/server"
// import crypto from "crypto"
// import { initializeApp, cert, getApps } from "firebase-admin/app"
// import { getFirestore } from "firebase-admin/firestore"

// // --- Init Firebase Admin ---
// if (!getApps().length) {
//   initializeApp({
//     credential: cert({
//       projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//     }),
//   })
// }

// const db = getFirestore()
// const MIDTRANS_SERVER_KEY = process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || ""

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()
//     const { order_id, status_code, gross_amount, signature_key, transaction_status } = body

//     // --- Verify Signature ---
//     const expectedSignature = crypto
//       .createHash("sha512")
//       .update(order_id + status_code + gross_amount + MIDTRANS_SERVER_KEY)
//       .digest("hex")

//     if (signature_key !== expectedSignature) {
//       return NextResponse.json({ message: "Invalid signature" }, { status: 403 })
//     }

//     // console.log("✅ Pay Account Notification Received")
//     // console.log("Order ID:", order_id)
//     // console.log("Transaction Status:", transaction_status)

//     // --- Update Firestore ---
//     let newStatus = ""
//     if (transaction_status === "settlement") {
//       newStatus = "paid"
//     } else if (transaction_status === "pending") {
//       newStatus = "pending"
//     } else if (transaction_status === "expire") {
//       newStatus = "expired"
//     }

//     if (newStatus) {
//       await db.collection("tickets").doc(order_id).update({
//         status: newStatus,
//         updatedAt: new Date(),
//       })
//       // console.log(`✅ Ticket ${order_id} updated to ${newStatus}`)
//     }

//     return NextResponse.json({ message: "Pay Account notification handled" })
//   } catch (error) {
//     // console.error("🔥 Pay Account notification error:", error)
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
//   }
// }

import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { initializeApp, cert, getApps } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  })
}

const db = getFirestore()
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || ""

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received notification body:", body);

    const { order_id, status_code, gross_amount, signature_key, transaction_status } = body;

    const expectedSignature = crypto
      .createHash("sha512")
      .update(order_id + status_code + gross_amount + MIDTRANS_SERVER_KEY)
      .digest("hex");

    console.log({ expectedSignature, signature_key });
    console.log("order_id:", order_id);
    console.log("status_code:", status_code);
    console.log("gross_amount:", gross_amount);
    console.log("MIDTRANS_SERVER_KEY:", MIDTRANS_SERVER_KEY);
    console.log("signature_key from Midtrans:", signature_key);
    console.log("expectedSignature calculated:", expectedSignature);

    if (signature_key !== expectedSignature) {
      console.warn("Signature mismatch");
      return NextResponse.json({ message: "Invalid signature" }, { status: 403 });
    }

    let newStatus = "";
    if (transaction_status === "settlement") newStatus = "paid";
    else if (transaction_status === "pending") newStatus = "pending";
    else if (transaction_status === "expire") newStatus = "expired";

    if (newStatus) {
      console.log(`Updating order ${order_id} to status ${newStatus}`);
      await db.collection("tickets").doc(order_id).set({
        status: newStatus,
        updatedAt: new Date(),
      }, { merge: true });
    }

    return NextResponse.json({ message: "Pay Account notification handled" });
  } catch (error) {
    console.error("Pay Account notification error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

