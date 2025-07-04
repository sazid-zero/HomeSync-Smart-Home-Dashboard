import React, {useState} from 'react';
import TimeRangeDropdown from "../components/DropDownMenu.tsx";
import TemperatureChart from "../components/TemperatureChart.tsx";
import ApplianceControlCard from "../components/ApplianceControlCard.tsx";

const devices = [
    { id: 1, name: "Air Condition", units: 2, power: "52kw", iconSrc: "/air-conditioner.png" },
    { id: 2, name: "Smart Lamp", units: 8, power: "12kw", iconSrc: "/light-bulb.png" },
    { id: 3, name: "Smart TV", units: 5, power: "21kw", iconSrc: "/monitor.png" },
    { id: 4, name: "Speaker", units: 1, power: "42kw", iconSrc: "/speaker.png" },
    { id: 5, name: "Fan", units: 3, power: "19kw", iconSrc: "/ceiling-fan.png" },
    { id: 6, name: "Heater", units: 1, power: "33kw", iconSrc: "/heating.png" },
];

interface DeviceCardProps {
    name: string;
    status: string;
    power: string;
    image: string;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ name, status, power, image }) => {
const [isOn, setIsOn] = useState(false);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevents default browser behavior
        setIsOn(!isOn);
};
    return(
    <div className="w-60 h-40 bg-white rounded-3xl shadow-[0_10px_10px_rgba(0,0,0,0.3)] flex space-x-17">
        <div className="flex flex-col pt-8 space-y-10">
            <div className="pl-8">
            <img src={image} alt="icon" className="size-[22px] rounded-sm " />
            </div>
        <div className="flex pl-5 flex-col space-y-1">
        <div className="text-lg font-bold">{name}</div>
        <div className="text-gray-500 text-[10px]">{status}</div>
        </div>
        </div>
        <div className="flex flex-col pt-7 space-y-10">

            <div
                className={`relative w-12 h-6 rounded-full p-1 cursor-pointer bg-gradient-to-b from-gray-300 to-gray-200`}
                onClick={handleToggle}
                onMouseDown={(e) => e.preventDefault()}
            >
                <div
                    className={`absolute w-4 h-4  rounded-full transition-transform duration-200 ${isOn ? 'translate-x-6 bg-black' : 'translate-x-0 bg-white'}`}
                ></div>
            </div>

            <div>
                <div className="text-xl text-black font-bold tracking-[-0.2em] ">---</div>
                <div className="text-[12px] bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold bg-clip-text text-transparent">{power}</div>
            </div>

        </div>
    </div>
);
}

const HumidityControl = () => {
    const [humidity, setHumidity] = useState(60);

    // Preset button handler
    const setPreset = (value: number) => {
        setHumidity(value);
    };

    return (
        <div className=" pt-6 space-y-6 w-FULL">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Humidity</h3>
                <span className="text-xl font-bold">{humidity}%</span>
            </div>

            {/* Custom Slider */}
            <div className="relative w-full">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={humidity}
                    onChange={(e) => setHumidity(Number(e.target.value))}
                    className="w-full h-2 appearance-none bg-gray-300 rounded-full
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-black
            [&::-webkit-slider-thumb]:shadow
            [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-black"
                    style={{
                        background: `linear-gradient(to right, black ${humidity}%, #e5e7eb ${humidity}%)`,
                    }}
                />
            </div>

            {/* Preset Buttons */}
            <div className="flex p-4 justify-center items-center space-x-6">
                <button
                    onClick={() => setPreset(50)}
                    className={` h-16 w-22 text-lg py-2 rounded-2xl shadow-[0_10px_10px_rgba(0,0,0,0.3)]  ${
                        humidity === 50 ? "bg-gray-100" : "bg-gray-300"
                    }`}
                >
                    Auto
                </button>
                <button
                    onClick={() => setPreset(30)}
                    className={`h-14 w-22 text-lg py-2 rounded-2xl shadow-[0_10px_10px_rgba(0,0,0,0.3)] ${
                        humidity === 30 ? "bg-gray-100" : "bg-gray-300"
                    }`}
                >
                    30%
                </button>
                <button
                    onClick={() => setPreset(60)}
                    className={`h-14 w-22 text-lg py-2 rounded-2xl shadow-[0_10px_10px_rgba(0,0,0,0.3)] ${
                        humidity === 60 ? "bg-gray-100" : "bg-gray-300"
                    }`}
                >
                    60%
                </button>
            </div>
        </div>
    );
};

const TemperatureControl: React.FC = () => {
    const [temperature, setTemperature] = useState(12);
    const [mode, setMode] = useState('HEATING');

    // Calculate rotation for the half-circle (0° to 180° for 10°C to 30°C)
    const rotation = ((temperature - 10) / 20) * 180; // Maps 10-30°C to 0-180°

    const handleTemperatureChange = (delta: number) => {
        setTemperature((prev) => Math.min(Math.max(prev + delta, 10), 30)); // Limit 10-30°C
    };

    const handleModeChange = (newMode: string) => {
        setMode(newMode);
    };

    return (
        <div className="w-100 pt-4 pl-6 pr-6 pb-4 bg-white rounded-2xl flex flex-col">
            <div className="flex justify-between">
                <h3 className="text-xl font-bold">Temperature</h3>
                <h3 className="text-xl font-bold">:</h3>
            </div>
            <div className="flex justify-center items-center w-full mt-12">

                    <div className="relative w-60 h-60 rounded-full border border-gray-200 shadow-[0_8px_10px_rgba(0,0,0,0.3)]">
            <div className="relative w-full h-full bg-gray-300 rounded-full border-12 border-gray-300 ">
                {/* Dial Background with Lines */}
                <div className="absolute w-full h-full rounded-full ">
                    {Array.from({ length: 21 }, (_, i) => {
                        const angle = (i * 180) / 20 -270;
                            return (
                                <div
                                    key={i}
                                    className="absolute w-[2px] h-[10px] bg-gray-400 shadow-[0_0_10px_rgba(0,0,0,0.6)]
"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: `rotate(${angle}deg) translateY(134px)`,
                                        transformOrigin: 'center center',
                                    }}
                                />
                            );
                    })}
                </div>
                {/* Black Half-Circle Indicator */}
                <div
                    className="absolute w-full h-full rounded-full overflow-hidden"
                    style={{
                        clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)', // Left half
                        transform: `rotate(${rotation}deg)`,
                        transformOrigin: 'center',
                    }}
                >
                    <div className="w-full h-full bg-gradient-to-t from-black via-gray-500 to-gray-400 shadow-[0_0_10px_rgba(0,0,0,0.3)] " ></div>
                </div>
                {/* Center Circle */}
                <div className="absolute w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl">

                    <div className="absolute w-42 h-42 rounded-full bg-gray-200 border border-black/2 shadow-2xl flex flex-col items-center pt-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                        <div className="text-gray-500 text-md font-bold uppercase ">{mode}</div>
                        <div className="text-[50px] font-bold text-gray-400 ">{temperature}</div>
                            <img src="/leaf.png " alt="icon" className="h-8 w-8" />


                    </div>

                </div>
            </div>
            </div>
            </div>


            <div className="flex space-x-4 mt-10 w-full justify-center">
                {['Heating', 'Cooling', 'Dry'].map((m) => (
                    <button
                        key={m}
                        className={`w-24 h-20 rounded-lg flex flex-col items-center justify-center bg-white border-2 shadow-[0_10px_10px_rgba(0,0,0,0.3)] ${
                            mode === m ? 'border-blue-500' : 'border-gray-200'
                        } hover:bg-gray-100`}
                        onClick={() => handleModeChange(m)}
                    >
                        <img
                            src={`/${m.toLowerCase()}.png`}
                            alt={m}
                            className="h-8 w-8"
                        />
                        <span className="text-md font-semibold">{m}</span>
                    </button>
                ))}
            </div>
            <div className="mt-6 flex space-x-2 w-full justify-center items-center">
                <button
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-300 to-gray-200 flex items-center justify-center"
                    onClick={() => handleTemperatureChange(-1)}
                >
                    -
                </button>
                <button
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-300 to-gray-200 flex items-center justify-center"
                    onClick={() => handleTemperatureChange(1)}
                >
                    +
                </button>
            </div>


            <HumidityControl/>
            <AirQuality/>


        </div>
    );
    }

    const AirQuality: React.FC = () => (
        <div className="flex flex-col space-y-4">
    <div className="pt-6 flex justify-between text-xl font-bold">
        <div>Air Quality</div>
        <div>Good</div>
    </div>

        <div className="flex justify-between">
            <div className="h-28 w-40 bg-white border-3 border-gray-300 rounded-xl shadow-[0_10px_0px_rgba(0,0,0,0.2)] flex justify-between items-center">CO: 874 ppm</div>
            <div className="h-28 w-42 bg-white border-3 border-gray-300 rounded-xl shadow-[0_10px_10px_rgba(0,0,0,0.2)]">Pollutants: 60 µN</div>
        </div>

        </div>

);


const UsageStats: React.FC = () => {
    const [selectedRange, setSelectedRange] = useState('Today');
    return (
        <div className="w-93 h-55 bg-white rounded-2xl shadow-[0_10px_10px_rgba(0,0,0,0.2)] pt-4 flex flex-col">

            <div className="flex justify-between items-center pl-4 pr-5">
                <h1 className="text-[12px] font-bold">Usage Status</h1>
                <TimeRangeDropdown selected={selectedRange} setSelected={setSelectedRange}/>
            </div>
            <TemperatureChart selectedRange={selectedRange}/>
        </div>
    );
}

const Appliances: React.FC = () => (
    <div>
        <ApplianceControlCard/>
    </div>
);

const PowerConsumption: React.FC = () => (
    <div className="h-68 w-93 bg-white rounded-xl p-4 shadow-[0_10px_10px_rgba(0,0,0,0.3)] flex flex-col space-y-4">
        <h3 className="text-[12px] font-bold">Device Power Consumption</h3>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-4 space-y-3">
            {devices.map((device) => (
                <div key={device.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-xl shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
                            <img src={device.iconSrc} alt={device.name} className="w-5 h-5 object-contain" />
                        </div>
                        <div className="flex flex-col space-y-0">
                            <h4 className="text-[12px] font-bold">{device.name}</h4>
                            <span className="text-[8px] text-gray-500">{device.units} unit</span>
                        </div>
                    </div>
                    <span className="text-[13px] font-bold">{device.power}</span>
                </div>
            ))}
        </div>
    </div>
);

const Occupant: React.FC = () => {
    const data=[
        { id: 1, name: "Sazid", imgSrc: "/profile/sazid.jpg" },
        { id: 2, name: "Juthi", imgSrc: "/profile/sharmin.jpg" },
        { id: 1, name: "Shafayat", imgSrc: "/profile/shafayat.jpg" },
        { id: 5, name: "Jui", imgSrc: "/profile/jui.jpg" }
    ]

   return (

        <div className="w-93 h-68 bg-white rounded-2xl shadow-[0_10px_10px_rgba(0,0,0,0.3)] p-4 flex flex-col">
            <div className="flex justify-between items-center">
                <h1 className="text-[12px] font-bold">Occupant</h1>
                <h3 className="text-[10px] font-semibold text-gray-500">See All {'->'} </h3>
            </div>

            <div className="grid grid-cols-6 gap-3 pt-4">
                {data.map((item) => (
                    <div key={item.id} className="flex flex-col items-center space-y-0">
                        <img src={item.imgSrc} alt={item.name} className="w-13 h-9 rounded-md" />
                        <h1 className="text-[10px] font-semibold ">{item.name}</h1>
                    </div>
                ))}
                <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">+</button>
            </div>
        </div>
    );
}

const Sidebar: React.FC = () => (
    <div className="w-60 bg-white min-h-screen pt-10 pl-9 flex flex-col space-y-6">
        <div className="flex items-center space-x-2">
            <img src="/profile.jpg" alt="User" className="rounded-full h-12 w-12" />
            <div className="flex flex-col space-y-1 pl-1">
            <span className="text-[12px] font-semibold text-third">Welcome back</span>
            <span className="text-sm font-bold text-gray-800">Sharif Mahmud</span>
            </div>
        </div>
        <div className="flex flex-col space-y-8 pt-4 pl-8 text-black">
            <div>Dashboard</div>
            <div>Rooms</div>
            <div>Recent</div>
            <div>Bookmark</div>
            <div>Notification</div>
            <div>Downloaded</div>
            <div>Support</div>
            <div>Setting</div>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    return (
        <div className="flex space-x-10">
            <Sidebar />
            <div className="flex flex-col pt-14 space-y-6">
                <span className="text-xl font-bold">My Devices</span>
                <div className="grid grid-cols-3 gap-x-5 gap-y-8">
                <DeviceCard name="Smart TV" status="Active for 3 hours" power="5kWh" image="/monitor.png"/>
                <DeviceCard name="Speaker" status="Active for 4 hours" power="5kWh" image="/speaker.png"/>
                <DeviceCard name="Router" status="Active for 3 hours" power="5kWh" image="/router.png"/>
                <DeviceCard name="WiFi" status="Active for 3 hours" power="5kWh" image="/hotspot.png"/>
                <DeviceCard name="Heater" status="Active for 3 hours" power="5kWh" image="/water-heater.png"/>
                <DeviceCard name="Socket" status="Active for 3 hours" power="5kWh" image="/plug.png"/>
                </div>

                <div className="grid grid-cols-2 pt-2 gap-x-5 gap-y-9">
                <UsageStats />
                <Appliances />
                <PowerConsumption />
                <Occupant />
                </div>
            </div>

            <div className="flex flex-col mt-15 h-240 w-100 bg-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] rounded-2xl mb-4">
                <TemperatureControl />
            </div>

        </div>
    );
};

export default Dashboard;