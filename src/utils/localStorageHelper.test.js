// scoreUtils.test.js
import { saveScoreToLocalStorage, fetchScoreFromLocalStorage } from './localStorageHelper';

describe('Local Storage Score Functions', () => {
    beforeEach(() => {
        // Clear the localStorage before each test
        localStorage.clear();
    });

    test('should save score to local storage', () => {
        const score = 100;
        const key = 'userScore';

        saveScoreToLocalStorage(score, key);

        // Check if the score was saved correctly
        const savedScore = localStorage.getItem(key);
        expect(savedScore).toBe(JSON.stringify(score));
    });

    test('should fetch score from local storage', () => {
        const score = 200;
        const key = 'userScore';
        
        // First save the score to local storage
        localStorage.setItem(key, JSON.stringify(score));

        // Now fetch the score
        const fetchedScore = fetchScoreFromLocalStorage(key);
        expect(fetchedScore).toBe(score);
    });

    test('should return null if no score is found in local storage', () => {
        const key = 'userScore';

        // Fetch score when nothing is set
        const fetchedScore = fetchScoreFromLocalStorage(key);
        expect(fetchedScore).toBeNull();
    });

    test('should save and fetch score with a custom key', () => {
        const score = 150;
        const customKey = 'customUser Score';

        // Save the score with a custom key
        saveScoreToLocalStorage(score, customKey);

        // Fetch the score using the custom key
        const fetchedScore = fetchScoreFromLocalStorage(customKey);
        expect(fetchedScore).toBe(score);
    });
});