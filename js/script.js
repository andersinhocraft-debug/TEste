document.addEventListener('DOMContentLoaded', () => {
    const appRoot = document.getElementById('app-root');

    function renderHomeScreen() {
        appRoot.innerHTML = `
            <div id="home-screen">
                <div class="choice-card" id="ai-btn">
                    <h2>AI Trainer</h2>
                    <p>Let our AI build a personalized workout for you.</p>
                </div>
                <div class="choice-card" id="manual-btn">
                    <h2>Manual Trainer</h2>
                    <p>Build your own workout from our extensive library.</p>
                </div>
            </div>
        `;
        document.getElementById('ai-btn').addEventListener('click', renderAiTrainerView);
        document.getElementById('manual-btn').addEventListener('click', renderManualTrainerView);
    }

    function renderAiTrainerView() {
        appRoot.innerHTML = `
            <section id="ai-questions">
                <h2>AI Trainer - Let's get to know you!</h2>
                <form id="ai-form">
                    <label for="goal">What is your primary fitness goal?</label>
                    <select id="goal" name="goal">
                        <option value="build-muscle">Build Muscle</option>
                        <option value="lose-weight">Lose Weight</option>
                        <option value="increase-strength">Increase Strength</option>
                    </select>
                    <label for="level">What is your experience level?</label>
                    <select id="level" name="level">
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                    <button type="submit">Generate Workout</button>
                </form>
            </section>
        `;
        document.getElementById('ai-form').addEventListener('submit', generateAiWorkout);
    }

    function generateAiWorkout(event) {
        event.preventDefault();
        const goal = document.getElementById('goal').value;
        const level = document.getElementById('level').value;

        const filteredExercises = exercises.filter(exercise => exercise.goal === goal && exercise.level === level);

        let workoutHTML = `<h3>Your Custom Workout Plan</h3><div class="exercise-list">`;
        if (filteredExercises.length > 0) {
            filteredExercises.forEach(exercise => {
                let setsReps = '';
                if (goal === 'build-muscle') {
                    setsReps = '3 sets of 8-12 reps';
                } else if (goal === 'lose-weight') {
                    setsReps = '4 sets of 12-15 reps';
                } else if (goal === 'increase-strength') {
                    setsReps = '5 sets of 5 reps';
                }

                workoutHTML += `
                    <div class="exercise-item">
                        ${exercise.gif ? `<img src="${exercise.gif}" alt="${exercise.name}">` : ''}
                        <div class="exercise-item-info">
                            <h4>${exercise.name}</h4>
                            <p>Muscle: ${exercise.muscle}</p>
                            <p><strong>${setsReps}</strong></p>
                        </div>
                    </div>
                `;
            });
        } else {
            workoutHTML += `<p>No exercises found for your specific goals and level. Here is a generic workout:</p>`;
            const genericExercises = exercises.filter(exercise => exercise.level === 'beginner');
            genericExercises.forEach(exercise => {
                workoutHTML += `
                    <div class="exercise-item">
                        ${exercise.gif ? `<img src="${exercise.gif}" alt="${exercise.name}">` : ''}
                        <div class="exercise-item-info">
                            <h4>${exercise.name}</h4>
                            <p>Muscle: ${exercise.muscle}</p>
                            <p><strong>3 sets of 10 reps</strong></p>
                        </div>
                    </div>
                `;
            });
        }
        workoutHTML += `</div>`;
        appRoot.innerHTML = `<section id="workout-plan">${workoutHTML}</section>`;
    }

    function renderManualTrainerView() {
        let exerciseListHTML = '';
        exercises.forEach((exercise, index) => {
            exerciseListHTML += `
                <div class="exercise-item">
                    ${exercise.gif ? `<img src="${exercise.gif}" alt="${exercise.name}">` : ''}
                    <div class="exercise-item-info">
                        <h4>${exercise.name}</h4>
                        <p>Muscle: ${exercise.muscle}</p>
                        <input type="number" placeholder="Sets" id="sets-${index}">
                        <input type="number" placeholder="Reps" id="reps-${index}">
                        <input type="number" placeholder="Weight (kg)" id="weight-${index}">
                        <button class="add-btn" data-exercise-name="${exercise.name}" data-exercise-index="${index}">Add</button>
                    </div>
                </div>
            `;
        });

        appRoot.innerHTML = `
            <div id="manual-trainer-view">
                <section id="exercise-library">
                    <h2>Exercise Library</h2>
                    <div class="exercise-list">
                        ${exerciseListHTML}
                    </div>
                </section>
                <section id="user-workout">
                    <h3>Your Workout</h3>
                    <ul id="workout-list"></ul>
                </section>
            </div>
        `;

        document.querySelectorAll('.add-btn').forEach(button => {
            button.addEventListener('click', addExerciseToWorkout);
        });
    }

    function addExerciseToWorkout(event) {
        const exerciseName = event.target.dataset.exerciseName;
        const exerciseIndex = event.target.dataset.exerciseIndex;
        const sets = document.getElementById(`sets-${exerciseIndex}`).value || '0';
        const reps = document.getElementById(`reps-${exerciseIndex}`).value || '0';
        const weight = document.getElementById(`weight-${exerciseIndex}`).value || '0';
        const workoutList = document.getElementById('workout-list');

        const newExercise = document.createElement('li');
        newExercise.classList.add('workout-item');

        newExercise.innerHTML = `
            <span>${exerciseName} - ${sets}x${reps} @ ${weight}kg</span>
            <button class="remove-btn">Remove</button>
        `;

        newExercise.querySelector('.remove-btn').addEventListener('click', () => {
            newExercise.remove();
        });

        workoutList.appendChild(newExercise);
    }

    renderHomeScreen();
});
