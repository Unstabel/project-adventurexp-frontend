import { useState } from "react";
import "./App.css";


export default function App() {
    const [selectedView, setSelectedView] = useState("homepage");


    function handleSelected(selected: string) {
        setSelectedView(selected);
    }


    return (
        <>
            <div className="outer-div-style">
                <div className="header-style">
                    <h2>AdventureXP</h2>
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1, padding: 10 }}>
                        <Buttons onSelected={handleSelected} />
                    </div>
                    <div className="button-style">
                        {selectedView == "homepage" ? <p>AdventureXP Homepage</p> : null}
                        {selectedView == "gokart" ? <p>AdventureXP Go-kart</p> : null}
                        {selectedView == "minigolf" ? <p>AdventureXP Mini-gold</p> : null}
                        {selectedView == "paintball" ? <p>AdventureXP Paintball</p> : null}
                        {selectedView == "climbing" ? <p>AdventureXP Climbing</p> : null}
                        {/* make new pages for the buttons here  */}
                    </div>
                </div>
            </div>
        </>
    );
}
type ButtonProps = {
    onSelected: (selected: string) => void;
};
const Buttons = (props: ButtonProps) => {
    const { onSelected: handleSelected} = props;
    return (
        <>
            <button className="btn-w100" onClick={() => handleSelected("homepage")}>
                Homepage
            </button>
            <button className="btn-w100" onClick={() => handleSelected("gokart")}>
                Go-kart
            </button>
            <button className="btn-w100" onClick={() => handleSelected("minigolf")}>
                Mini-golf
            </button>
            <button className="btn-w100" onClick={() => handleSelected("paintball")}>
                Paintball
            </button>
            <button className="btn-w100" onClick={() => handleSelected("climbing")}>
                Climbing
            </button>
            {/* Add a new buttons here */}
        </>
    );
};
