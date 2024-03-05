import React, { useState } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import { Notification } from '../components/notifications';

function Generate() {
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const storeQRCode = async () => {
    try {
      if (qrCodeValue.trim() === "") {
        throw new Error("QR Code value cannot be empty");
      }

      await axios.post("/api/qrcodes", { value: qrCodeValue });
      setShowNotification(true);
      setNotificationMessage("QR Code stored successfully");
    } catch (error) {
      console.error("Error storing QR Code:", error);
      setShowNotification(true);
      setNotificationMessage("Error storing QR Code");
    }
  };
  
  return (
    <div>
      <div>Generate QR</div>

      {qrCodeValue !== "" && <QRCode value={qrCodeValue} />}
      <input
        onChange={(e) => {
          setQrCodeValue(e.target.value);
        }}
      />
      <button onClick={storeQRCode}>Store QR Code</button>
      {showNotification && <Notification message={notificationMessage} />}
    </div>
  );
}

export default Generate;
