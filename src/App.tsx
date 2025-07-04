import Dashboard from "./pages/Dashboard.tsx";


function App() {
    return (

        <div className="App bg-gray-200 min-h-screen">
            <div className="md:hidden fixed w-full flex items-center justify-between p-4 bg-white z-50 shadow">
                <h1 className="text-lg font-bold">Dashboard</h1>
                <button className="text-xl">☰</button>
            </div>
            <Dashboard/>
        </div>
    )

}

export default App