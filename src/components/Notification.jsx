import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import NotificationItem from "./NotificationItem";

const Notification = ({ notificationData }) => {
  return (
    <>
      <h1 className="text-xl sticky left-0 top-0 md:text-3xl font-bold border-b-2 border-gray-300">
        Notification
      </h1>
      <NotificationItem
        goto={() => {}}
        info="John requested to withdraw credit"
        credit={10}
        time="2s ago"
      />
      <NotificationItem
        info="Charlie requested to withdraw credit"
        credit={20}
        time="1m ago"
      />
      <NotificationItem
        info="Alexa requested to withdraw credit"
        credit={100}
        time="10m ago"
      />
    </>
  );
};

export default Notification;
