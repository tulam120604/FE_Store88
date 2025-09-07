"use client";

import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

type MessageType = "success" | "error" | "info" | "warning";

let pushMessage: (type: MessageType, text: string, duration?: number) => void;

export const MessageContainer = () => {
  const [message, setMessage] = useState<{
    type: MessageType;
    text: string;
  } | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    pushMessage = (type, text, duration = 2500) => {
      setMessage({ type, text });
      setTimeout(() => setMessage(null), duration);
    };
  }, []);

  if (!mounted) return null; // tránh lỗi document.body chưa tồn tại

  return createPortal(
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-[999999] flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg text-white
            ${
              message.type === "success"
                ? "bg-green-500"
                : message.type === "error"
                ? "bg-red-500"
                : message.type === "warning"
                ? "bg-yellow-500"
                : "bg-blue-500"
            }`}
        >
          {message.type === "success" && <CheckCircle2 />}
          {message.type === "error" && <XCircle />}
          {message.type === "info" && <Info />}
          {message.type === "warning" && <AlertTriangle />}
          <span>{message.text}</span>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// API giống antd
export const message = {
  success: (text: string, duration?: number) =>
    pushMessage("success", text, duration),
  error: (text: string, duration?: number) =>
    pushMessage("error", text, duration),
  info: (text: string, duration?: number) =>
    pushMessage("info", text, duration),
  warning: (text: string, duration?: number) =>
    pushMessage("warning", text, duration),
};
