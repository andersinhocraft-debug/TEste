const aiBtn = document.getElementById('ai-btn');
const manualBtn = document.getElementById('manual-btn');
const mainContent = document.querySelector('main');

aiBtn.addEventListener('click', startAiTrainer);
manualBtn.addEventListener('click', startManualTrainer);

function startAiTrainer() {
    mainContent.innerHTML = `
        <section id="ai-questions">
            <h2>AI Trainer - Let's get to know you!</h2>
            <form id="ai-form">
                <label for="goal">What is your primary fitness goal?</label>
                <select id="goal" name="goal">
                    <option value="build-muscle">Build Muscle</option>
                    <option value="lose-weight">Lose Weight</option>
                    <option value="increase-strength">Increase Strength</option>
                </select>
                <br><br>
                <label for="level">What is your experience level?</label>
                <select id="level" name="level">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
                <br><br>
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

    let workoutHTML = `<h3>Your Custom Workout Plan</h3>`;
    if (filteredExercises.length > 0) {
        filteredExercises.forEach(exercise => {
            workoutHTML += `
                <div class="exercise-item">
                    ${exercise.gif ? `<img src="${exercise.gif}" alt="${exercise.name}">` : ''}
                    <h4>${exercise.name}</h4>
                    <p>Muscle: ${exercise.muscle}</p>
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
                    <h4>${exercise.name}</h4>
                    <p>Muscle: ${exercise.muscle}</p>
                </div>
            `;
        });
    }

    mainContent.innerHTML = `<section id="workout-plan">${workoutHTML}</section>`;
}

function startManualTrainer() {
    let exerciseListHTML = '';
    exercises.forEach(exercise => {
        exerciseListHTML += `
            <div class="exercise-item">
                ${exercise.gif ? `<img src="${exercise.gif}" alt="${exercise.name}">` : ''}
                <h4>${exercise.name}</h4>
                <p>Muscle: ${exercise.muscle}</p>
                <button class="add-btn" data-exercise="${exercise.name}">Add</button>
            </div>
        `;
    });

    mainContent.innerHTML = `
        <section id="exercise-library">
            <h2>Exercise Library</h2>
            <div class="exercise-list">
                ${exerciseListHTML}
            </div>
            <div id="user-workout">
                <h3>Your Workout</h3>
                <ul id="workout-list"></ul>
            </div>
        </section>
    `;

    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', addExerciseToWorkout);
    });
}

function addExerciseToWorkout(event) {
    const exerciseName = event.target.dataset.exercise;
    const workoutList = document.getElementById('workout-list');
    const newExercise = document.createElement('li');
    newExercise.textContent = exerciseName;
    workoutList.appendChild(newExercise);
}
