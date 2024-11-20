# Bitcoin Price Guessing Game

A game that challenges you to predict whether the price of Bitcoin (BTC/USD) will rise or fall after 10 seconds (You can configure this). It utilizes real-time Bitcoin prices from reliable online sources, ensuring accurate and up-to-date information.

<img width="950" alt="Screenshot 2024-11-19 at 4 47 16 PM" src="https://github.com/user-attachments/assets/1a8538bf-f1bf-4343-8dc0-da569138e501">


Live URL : [Link](https://ishwarrimal.github.io/bitcoinprice-guessing-game/)  
Demo video : [Link](https://www.loom.com/share/ca8793fe389d4ea2a5b23edb89a3583a?sid=a55bb3e0-e330-4b61-a0e1-097d794b7c6f)

# Getting Started:
1. Clone the repo `git clone https://github.com/ishwarrimal/bitcoinprice-guessing-game.git`
2. Install required dependencies `npm install`
3. Run the app locally: `npm run start`
4. Testing the app: `npm run test`
5. Deploying the app: `npm run deploy`
    * we're currently using github pages to deploy the app.

# Checklist

- [x] The player can at all times see their current score and the latest available BTC price in USD
- [x] The player can choose to enter a guess of either “up” or “down“
- [x] After a guess is entered the player cannot make new guesses until the existing guess is resolved
- [x] The guess is resolved when the price changes and at least 60 seconds have passed since the guess was made
- [x] If the guess is correct (up = price went higher, down = price went lower), the user gets 1 point added to their score. If the guess is incorrect, the user loses 1 point.
- [x] Players can only make one guess at a time
- [x] New players start with a score of 0

Solution requirements:

- [x] The guesses should be resolved fairly using BTC price data from any available 3rd party API
- [ ] The score of each player should be persisted in a backend data store (AWS services preferred)
- [x] Please provide us a link to your deployed solution
- [x] Testing is encouraged
- [x] Optional: Players should be able to close their browser and return back to see their score and continue to make more guesses.
- [x] Describe the app's functionality as well as how to run and deploy the application to the best of your ability in a README file.
- [x] Please provide the project in a public git repository.

## Solution Walkthrough:
1. **Live Price**
   - Used web sockets to fetch live BTC price.
2. **Persisting user score**
   - Used local storage of the browser to persist their score.
3. **Live UI Updates**
   - Used custom hooks for fetchingPrice and showing countdown
4. **Customizability**
   - Option for user to select 10,30,60 seconds guessing time. (I don't think you'd want to wait 60 seconds to see if my solution works)
5. **CI/CD**
   - Created github workflows and integrated with GH Pages to deploy app while running workflow.
6. **Testing**
   - Testing for utility files using React Testing Library
7. **Mobile Friendly**
   - Optimized the application for mobile responsiveness.


# Future Scope:
- Using TS for robustness, reliability, and maintainability.
- **Security**: Enabling authentication and authorization.
- **Internationalization**: Creating JSON file to store UI constants.
- **Leader board**: With login session, we can store the user score in a database.
- **Error Reporting**: Using tools like sentry to report any runtime error.
- **Analytics**: Tracking events of user interaction in tools.
- **Performance**: Can use code splitting and lazy loading with suspense fallback to improve performance.
- **Testing Coverage**: maintaining a good coverage for tests
