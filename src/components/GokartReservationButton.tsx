import React, { useState } from "react";
import ReactDOM from "react-dom";
import BookGokartForm from "./GokartReservationForm";

const BookGokartButton = () => {
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
    };

    return (
        <div>
            <br/>
            <p>Hello Brother</p>
            <br/>
            <button className="btn-w100" type="button" onClick={handleClick}>
                Make Go-Kart Reservation
            </button>
            {showForm &&
                ReactDOM.createPortal(
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={handleClose}>
                                    &times;
                                </span>
                                <BookGokartForm/>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default BookGokartButton;
