import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

// CORRECT IMPORT PATH: The path starts from the current folder ('src/')
// and goes down into 'assest/'
import workoutImageFile from "./assets/img.png"; 

export default function TodoList() {
    // We'll keep the todo state, but rename to 'exercises' for better fit
    // Add a 'duration' property to each exercise
    let [exercises, setExercises] = useState([
        { task: "Push ups", duration: "10min", id: uuidv4(), done: false },
        { task: "Running", duration: "15min", id: uuidv4(), done: false },
        { task: "Squats", duration: "20min", id: uuidv4(), done: false },
        { task: "Cycling", duration: "20min", id: uuidv4(), done: false },
    ]);
    let [newExercise, setNewExercise] = useState({ name: "", duration: "10min" }); // Object for new exercise

    // --- Placeholder Data for UI replication ---
    const eventName = "Master Your Day.";
    const startTime = "6:00";
    const endTime = "7:00";
    
    // Assign the imported file to the workoutImage variable
    const workoutImage = workoutImageFile; 

    // --- Event Handlers (Adjusted for exercises) ---
    let addNewExercise = () => {
        if (!newExercise.name.trim()) return;

        setExercises((prevExercises) => {
            return [...prevExercises, { 
                task: newExercise.name.trim(), 
                duration: newExercise.duration, // Use duration from state
                id: uuidv4(), 
                done: false 
            }];
        });

        setNewExercise({ name: "", duration: "10min" }); // Reset input
    };

    let updateNewExerciseName = (event) => {
        setNewExercise(prev => ({ ...prev, name: event.target.value }));
    };

    let updateNewExerciseDuration = (event) => {
        setNewExercise(prev => ({ ...prev, duration: event.target.value }));
    };

    let deleteExercise = (id) => {
        setExercises((prevExercises) => prevExercises.filter((exercise) => exercise.id !== id));
    };

    let toggleDone = (id) => {
        setExercises((prevExercises) =>
            prevExercises.map((exercise) =>
                exercise.id === id ? { ...exercise, done: !exercise.done } : exercise
            )
        );
    };

    let clearAll = () => {
        setExercises([]);
    };

    return (
        <div className="event-screen-container">
            {/* Top Header Section (Not explicitly in image, but implied 'New Event') */}
            <h1 className="screen-header">PlanPro</h1>

            {/* Event Header Card (White Card with Image and Event Name) */}
            <div className="event-header-card">
                <div className="event-details">
                    <span className="event-label">PlanPro</span>
                    <h3 className="event-title">{eventName}</h3>
                </div>
                <div className="event-image-container">
                    <img src={workoutImage} alt="Workout" className="event-image" />
                </div>
            </div>

            {/* Main Content Card (Large Blue Card) */}
            <div className="main-content-card">
                {/* Time Selection Section */}
                <div className="time-selection-section">
                    <span className="section-label">Start Time</span>
                    <div className="time-display">
                        <div className="time-item">
                            <span className="time-label">from</span>
                            <span className="time-value">{startTime}</span>
                        </div>
                        <div className="time-divider"></div> {/* Visual divider */}
                        <div className="time-item">
                            <span className="time-label">to</span>
                            <span className="time-value">{endTime}</span>
                        </div>
                    </div>
                </div>

                <hr className="card-divider" />

                {/* Exercise List Section */}
                <div className="exercise-list-section">
                    <span className="section-label">Exercise</span>
                    <div className="exercise-list-items">
                        {exercises.map((exercise) => (
                            <div key={exercise.id} className={`exercise-item ${exercise.done ? 'done' : ''}`}>
                                <span className="exercise-name">{exercise.task}</span>
                                <span className="exercise-duration">{exercise.duration}</span>
                                <label className="radio-container">
                                    <input 
                                        type="radio" 
                                        checked={exercise.done} // Radio button acts as the 'done' toggler
                                        onChange={() => toggleDone(exercise.id)}
                                    />
                                    <span className="checkmark"></span> {/* Custom radio button checkmark */}
                                </label>
                                {/* Add a delete button for management, though not in the image */}
                                <button onClick={() => deleteExercise(exercise.id)} className="delete-exercise-btn">x</button>
                            </div>
                        ))}
                    </div>

                    {/* New Exercise Input Area (not in image, but essential for functionality) */}
                    <div className="new-exercise-input-group">
                        <input
                            type="text"
                            placeholder="Add new exercise name"
                            value={newExercise.name}
                            onChange={updateNewExerciseName}
                            className="new-exercise-input"
                        />
                        <input
                            type="text"
                            placeholder="Duration (e.g., 10min)"
                            value={newExercise.duration}
                            onChange={updateNewExerciseDuration}
                            className="new-exercise-duration-input"
                        />
                        <button onClick={addNewExercise} className="add-new-exercise-btn">Add</button>
                    </div>
                </div>

                {/* Bottom Navigation / Action Bar */}
                <div className="bottom-action-bar">
                    <button className="back-button">
                        <i className="arrow left"></i> {/* Using a simple arrow icon */}
                    </button>
                    <button className="create-event-button">
                        Create Event <span className="plus-icon">+</span>
                    </button>
                    {/* Clear All button is not in the image, so it's removed for fidelity.
                         If needed, you can add it back with appropriate styling */}
                    {/* <button onClick={clearAll} className="clear-all-button">Clear All</button> */}
                </div>
            </div>
        </div>
    );
}