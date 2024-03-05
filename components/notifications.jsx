import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Notification = ({ message }) => {
  useEffect(() => {
    console.log("Notification message:", message);
    toast(message);
  }, [message]);

  return <ToastContainer />;
};
