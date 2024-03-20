import React, { useState, ChangeEvent, FormEvent } from 'react';

const BookMinigolfForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        participants: '',
        date: '',
        time_start: '',
        time_end: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('https://adventurexp.azurewebsites.net/minigolf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Form data submitted successfully');
            setFormData({
                name: '',
                participants: '',
                date: '',
                time_start: '',
                time_end: ''
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
                <input type="time" name="time_start" value={formData.time_start} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Time End:
                <input type="time" name="time_end" value={formData.time_end} onChange={handleChange}/>
            </label>
            <br/>
            <br/>
            <button className="btn-w100" type="submit">Submit</button>
        </form>
    );
};

export default BookMinigolfForm;
