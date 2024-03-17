import React, { useState } from "react";
import ReactDOM from "react-dom";
import BookPaintballForm from "./PaintballReservationForm";

const BookPaintballButton = () => {
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
                Make Paintball Reservation
            </button>
            {showForm &&
                ReactDOM.createPortal(
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={handleClose}>
                                    &times;
                                </span>
                                <BookPaintballForm />
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default BookPaintballButton;
