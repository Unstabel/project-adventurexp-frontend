
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
                    <div key={index}>
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

    return (
        <div className="button-style">
            <button onClick={() => handleActivityButtonClick('minigolf')}>Minigolf</button>
            <button onClick={() => handleActivityButtonClick('paintball')}>Paintball</button>
            <button onClick={() => handleActivityButtonClick('climbing')}>Climbing</button>
            <button onClick={() => handleActivityButtonClick('gokart')}>Go-Kart</button>
            <Overview entities={activityEntities} />
        </div>
    );
}