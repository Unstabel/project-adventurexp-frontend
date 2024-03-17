import React, { useState, ChangeEvent, FormEvent } from 'react';

const BookGokartForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        participants: '',
        date: '',
        time_start: '',
        time_end: '',
        child_karts: '',
        adult_karts: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>Fill out your information</p>
            <br/>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Participants:
                <input type="number" name="participants" value={formData.participants} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Date:
                <input type="date" name="date" value={formData.date} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Time Start:
                <input type="time" name="time_start" value={formData.time_start} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Time End:
                <input type="time" name="time_end" value={formData.time_end} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Child Karts:
                <input
                    type="number"
                    name="child_karts"
                    value={formData.child_karts}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <label>
                Adult Karts:
                <input
                    type="number"
                    name="adult_karts"
                    value={formData.adult_karts}
                    onChange={handleChange}
                />
            </label>
            <br/>
            <br/>
            <button className="btn-w100" type="submit">Submit</button>
        </form>
    );
};

export default BookGokartForm;
