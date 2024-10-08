import React from 'react';
import Componynavabar from '../navbar/Componynavabar';

const Dashboard = () => {
    return (
        <div className="container mt-4">

            {/* Header Section */}
            <h1 className="text-center mb-4" style={{ color: '#333', fontWeight: 'bold' }}>Dashboard Overview</h1>

            <div className="row">
                {/* Completed Tasks Card */}
                <div className="col-md-4 d-flex justify-content-center mb-4">
                    <div className="card text-white bg-success" style={cardStyle}>
                        <div className="card-header" style={headerStyle}>Completed Tasks</div>
                        <div className="card-body">
                            <h5 className="card-title" style={titleStyle}>10 Tasks</h5>
                            <p className="card-text" style={textStyle}>All tasks that have been successfully completed.</p>
                        </div>
                    </div>
                </div>

                {/* Pending Tasks Card */}
                <div className="col-md-4 d-flex justify-content-center mb-4">
                    <div className="card text-white bg-warning" style={cardStyle}>
                        <div className="card-header" style={headerStyle}>Pending Tasks</div>
                        <div className="card-body">
                            <h5 className="card-title" style={titleStyle}>5 Tasks</h5>
                            <p className="card-text" style={textStyle}>Tasks that are still in progress and need to be completed.</p>
                        </div>
                    </div>
                </div>

                {/* To-Do Tasks Card */}
                <div className="col-md-4 d-flex justify-content-center mb-4">
                    <div className="card text-white bg-info" style={cardStyle}>
                        <div className="card-header" style={headerStyle}>To-Do Tasks</div>
                        <div className="card-body">
                            <h5 className="card-title" style={titleStyle}>8 Tasks</h5>
                            <p className="card-text" style={textStyle}>Tasks that are planned but not yet started.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Styling Variables
const cardStyle = {
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
    width: '100%', // Full width within its column
    maxWidth: '300px', // Maximum width for cards
};

const headerStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
};

const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
};

const textStyle = {
    fontSize: '1rem',
};

export default Dashboard;
