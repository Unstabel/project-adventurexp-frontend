import React, { useState, ChangeEvent, FormEvent } from 'react';

const BookPaintballForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        participants: '',
        date: '',
        time_start: '',
        time_end: '',
        balls: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
                Balls per person:
                <select
                    name="balls"
                    value={formData.balls}
                    onChange={handleChange}
                >
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                </select>
            </label>
            <br/>
            <br/>
            <button className="btn-w100" type="submit">Submit</button>
        </form>
    );
};

export default BookPaintballForm;
