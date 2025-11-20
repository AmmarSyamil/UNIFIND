import { useState } from "react";
import Map from "./map";
import { Sidebar } from "./sidebar";

export default function Main() {
    const [map, setMap] = useState(null);

    return (
        <div className="flex min-h-screen gap-4">
            <div className="w-2/3 border border-gray-300 rounded-2xl shadow-md bg-white overflow-hidden">
                <div className="h-screen">
                    <Map client:only setMap={setMap}/>
                </div>
            </div>

            <div className="w-1/3 flex flex-col justify-start border border-gray-300 rounded-2xl shadow-md ">
                <Sidebar client:load map={map}/>
            </div>
        </div>
    )
}
