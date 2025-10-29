# Pixi.js Board Game

A fun, interactive board game built with Pixi.js, TypeScript, and Vite. Players spin dice to move around the board, collect prizes, and enter exciting bonus rounds. The game features smooth animations, sound effects, and a dynamic UI.
# Bonus round activates on 5th square there is 
![bonus round screen](/assets/images/defaults/screenshot.png) 

## Features

-   **Dynamic Game Board:** A 16-square board with start, prize, and bonus squares.
-   **Player Movement:** Smooth player token animation using GSAP.
-   **Visual Dice Roll:** An animated dice roll appears on every spin to show the result.
-   **Bonus Round:** Land on the bonus square to enter a special mode with higher prizes and free spins.
-   **Interactive UI:** A clean HTML/CSS interface for managing bets, viewing balance, and spinning.
-   **Sound Effects:** Audio feedback for key actions like rolling, collecting prizes, and entering bonus mode.
-   **Mock Backend:** A simple mock backend simulates API responses for game data and spin results, allowing for easy testing via a URL query parameter (`?mock=true`).

## Technology Stack

-   **Rendering Engine:** [Pixi.js](https://pixijs.com/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Animation:** [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
-   [Node.js](https://nodejs.org/) (v18.x or later recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js) or another package manager like [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/).

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://your-repository-url.git
    ```
    (Replace `https://your-repository-url.git` with the actual URL of your Git repository)

2.  **Navigate to the project directory:**
    ```bash
    cd your-project-directory
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```
    This command will download and install all the necessary packages defined in `package.json`.

## Running the Project

To run the game in a local development environment, use the following command:

```bash
npm run dev