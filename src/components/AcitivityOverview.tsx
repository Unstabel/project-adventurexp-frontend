
import ReactDOM from "react-dom";
import React, {useEffect, useState} from 'react';

interface Entity {
    name: string;
    participants: number;
    date: number[];
    timeStart?: number[];
    timeEnd?: number[];
}

interface OverviewProps {
    entities: Entity[];
}

export function Overview({ entities }: OverviewProps) {
    return (
        <div>
            <p>Here is the overview</p>
            <div>
                {entities.map((entity, index) => (
                    <div className="overview-item" key={index}>
                        <div>Name: {entity.name}</div>
                        <div>Participants: {entity.participants}</div>
                        <div>Date: {entity.date}</div>
                        {entity.timeStart && <div>Start Time: {entity.timeStart}</div>}
                        {entity.timeEnd && <div>End Time: {entity.timeEnd}</div>}
                        <br/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function MainComponent() {
    const [selectedView, setSelectedView] = useState<string>("homepage");
    const [minigolfData, setMinigolfData] = useState<Entity[]>([]);
    const [paintballData, setPaintballData] = useState<Entity[]>([]);
    const [climbingData, setClimbingData] = useState<Entity[]>([]);
    const [gokartData, setGokartData] = useState<Entity[]>([]);
    const [showCurrentDayBookings, setShowCurrentDayBookings] = useState<boolean>(false);

    useEffect(() => {
        Promise.all([
            fetch('https://adventurexp.azurewebsites.net/minigolf').then(response => response.json()),
            fetch('https://adventurexp.azurewebsites.net/paintball').then(response => response.json()),
            fetch('https://adventurexp.azurewebsites.net/climbing').then(response => response.json()),
            fetch('https://adventurexp.azurewebsites.net/gokart').then(response => response.json())
        ]).then(([minigolfData, paintballData, climbingData, gokartData]) => {
            setMinigolfData(minigolfData);
            setPaintballData(paintballData);
            setClimbingData(climbingData);
            setGokartData(gokartData);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const handleActivityButtonClick = (activity: string) => {
        setSelectedView(activity);
    };
    const handleShowCurrentDayBookingsChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setShowCurrentDayBookings(event.target.checked);
    };

        let activityEntities: Entity[] = [];
        switch (selectedView) {
            case 'minigolf':
                activityEntities = minigolfData;
                break;
            case 'paintball':
                activityEntities = paintballData;
                break;
            case 'climbing':
                activityEntities = climbingData;
                break;
            case 'gokart':
                activityEntities = gokartData;
                break;
            default:
                break;
        }
        const sortEntities = (entities: Entity[]) => {
            return entities.sort((a, b) => {
                // Compare dates
                const dateComparison = a.date.toString().localeCompare(b.date.toString());
                if (dateComparison !== 0) {
                    return dateComparison;
                }

                // Compare timeStart if available
                if (a.timeStart && b.timeStart) {
                    return a.timeStart.toString().localeCompare(b.timeStart.toString());
                }

                // If timeStart is not available, consider them equal
                return 0;
            });
        };

        // Filter bookings for the current day if the checkbox is checked
        if (showCurrentDayBookings) {
            const currentDate = new Date();
            activityEntities = activityEntities.filter(entity => {
                const [year, month, day] = entity.date;
                const entityDate = new Date(year, month - 1, day); // Month is 0-based in Date constructor
                return entityDate.toDateString() == currentDate.toDateString();
            });
        }

        // Sort the activityEntities
        const sortedActivityEntities = sortEntities(activityEntities);

        // Render the Overview component with sorted entities
        return (
            <div className="button-style">
                <button onClick={() => handleActivityButtonClick('minigolf')}>Minigolf</button>
                <button onClick={() => handleActivityButtonClick('paintball')}>Paintball</button>
                <button onClick={() => handleActivityButtonClick('climbing')}>Climbing</button>
                <button onClick={() => handleActivityButtonClick('gokart')}>Go-Kart</button>
                <label>
                    Show only current day bookings:
                    <input
                        type="checkbox"
                        checked={showCurrentDayBookings}
                        onChange={handleShowCurrentDayBookingsChange}
                    />
                </label>
                <Overview entities={activityEntities}/>
            </div>
        );
    }
