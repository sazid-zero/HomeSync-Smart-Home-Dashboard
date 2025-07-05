
import React, { useState } from "react";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import Dashboard from "../pages/Dashboard";

const AppLayoutContent: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="App theme-bg-primary min-h-screen">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 flex items-center justify-between p-4 theme-bg-secondary z-50 shadow-md">
                <h1 className="text-lg font-bold theme-text-primary">Dashboard</h1>
                <button
                    className="text-xl theme-text-primary cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black/20 bg-opacity-50 z-50" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="fixed right-0 top-0 h-full w-64 theme-bg-secondary shadow-lg z-50 p-6">
                        <div className="flex items-center space-x-2 mb-8">
                            <img src="/profile.jpg" alt="User" className="rounded-full h-12 w-12" />
                            <div className="flex flex-col space-y-1">
                                <span className="text-xs font-semibold theme-text-tertiary">Welcome back</span>
                                <span className="text-sm font-bold theme-text-primary">Sharif Mahmud</span>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-6 theme-text-primary">
                            <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70">
                                <span className="text-lg">🏠</span>
                                <span>Dashboard</span>
                            </div>
                            <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70">
                                <span className="text-lg">🏠</span>
                                <span>Rooms</span>
                            </div>
                            <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70">
                                <span className="text-lg">🕒</span>
                                <span>Recent</span>
                            </div>
                            <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70">
                                <span className="text-lg">🔖</span>
                                <span>Bookmark</span>
                            </div>
                            <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70">
                                <span className="text-lg">🔔</span>
                                <span>Notification</span>
                            </div>
                            <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70">
                                <span className="text-lg">📥</span>
                                <span>Downloaded</span>
                            </div>
                            <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70">
                                <span className="text-lg">🆘</span>
                                <span>Support</span>
                            </div>
                            <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70">
                                <span className="text-lg">⚙️</span>
                                <span>Setting</span>
                            </div>
                            <div
                                className="flex items-center space-x-3 cursor-pointer hover:opacity-70"
                                onClick={toggleTheme}
                            >
                                <span className="text-lg">{isDarkMode ? '☀️' : '🌙'}</span>
                                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="lg:pt-0 pt-16">
                <Dashboard/>
            </div>
        </div>
    );
};

const AppLayout: React.FC = () => {
    return (
        <ThemeProvider>
            <AppLayoutContent />
        </ThemeProvider>
    );
};

export default AppLayout;
