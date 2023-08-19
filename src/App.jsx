import React, { useEffect, useState } from "react";
import Title from "./assets/components/Title";
import Tour from "./assets/components/Tour";
import Log from "./assets/components/Log";

function App() {
    const [dormBuilding, setDormBuilding] = useState("Tower C");
    const [weekend, setWeekend] = useState(false);
    const [tours, setTours] = useState([]);
    const [hidden2, setHidden2] = useState(false);

    const data = JSON.parse(localStorage.getItem("dutyData"));

    function updateData() {
        localStorage.setItem("dutyData", JSON.stringify(tours));
    }

    async function handleDayChange() {
        setWeekend(!weekend);
        if (!weekend && tours.length < 4) {
            const temp = data;
            temp.push({
                start: "",
                end: "",
                resInteractions: [""],
                staffInteractions: [""],
            });

            setTours(temp);
            localStorage.setItem("dutyData", JSON.stringify(temp));
        } else {
            const temp = data;
            temp.pop();
            setTours(temp);
            localStorage.setItem("dutyData", JSON.stringify(temp));
        }
    }

    useEffect(() => {
        let abc = [];
        for (let i = 0; i < 3; i++) {
            abc = [
                ...abc,
                {
                    start: "",
                    end: "",
                    resInteractions: [""],
                    staffInteractions: [""],
                },
            ];
        }

        if (!localStorage.getItem("dutyData")) {
            localStorage.setItem("dutyData", JSON.stringify(abc));
            setTours(abc);
        } else {
            setTours(JSON.parse(localStorage.getItem("dutyData")));
        }
    }, []);

    return (
        <div>
            <Title dormBuilding={dormBuilding} />

            <input type="checkbox" onChange={handleDayChange} value={weekend} />
            <label>Weekend?</label>

            {data &&
                data.map((tour, i) => {
                    return (
                        <Tour
                            key={i}
                            tour={tour}
                            tours={tours}
                            tourNumber={i}
                            storedTourData={data[i]}
                            updateData={updateData}
                            setTours={setTours}
                        />
                    );
                })}
            <div className="d-flex justify-content-center">
                <button className="btn btn-success" onClick={()=>{setHidden2(!hidden2)}}>Submit</button>
            </div>
            {hidden2 && <Log data={data} />}
        </div>
    );
}

export default App;
