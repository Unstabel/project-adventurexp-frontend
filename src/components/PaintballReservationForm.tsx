import React, { useState, ChangeEvent, FormEvent } from 'react';

const BookPaintballForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        participants: '',
        date: '',
        timeStart: '',
        timeEnd: '',
        balls: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('https://adventurexp.azurewebsites.net/paintball', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Data submitted');
            setFormData({
                name: '',
                participants: '',
                date: '',
                timeStart: '',
                timeEnd: '',
                balls: ''
            });
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
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
                <input type="time" name="timeStart" value={formData.timeStart} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Time End:
                <input type="time" name="timeEnd" value={formData.timeEnd} onChange={handleChange}/>
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
