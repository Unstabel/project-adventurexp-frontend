import React, { useState } from "react";
import ReactDOM from "react-dom";
import BookClimbingForm from "./ClimbingReservationForm";

const BookClimbingButton = () => {
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
    };

    return (
        <div>
            <button className="btn-w100" type="button" onClick={handleClick}>
                Make Climbing Reservation
            </button>
            {showForm &&
                ReactDOM.createPortal(
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={handleClose}>
                                    &times;
                                </span>
                                <BookClimbingForm />
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default BookClimbingButton;