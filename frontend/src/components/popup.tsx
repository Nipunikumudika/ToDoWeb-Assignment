import React, { FC } from "react";
import "./popup.css";

interface PopupProps {
  handleClose: () => void;
  content: React.ReactNode;
}

const Popup: FC<PopupProps> = ({ handleClose, content }) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>x</span>
        {content}
      </div>
    </div>
  );
};

export default Popup;
