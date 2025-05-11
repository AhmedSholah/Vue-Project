<template>
    <div class="not-found">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 14.300000190734863 81.25 36.60000228881836"
            data-asc="1"
            class="background-svg"
        >
            <defs />
            <g>
                <g>
                    <g transform="translate(0, 0)">
                        <path
                            d="M9.25 50.65Q6.97 50.65 4.41 50.14Q1.85 49.63 0 48.40L1.85 42.80Q2.95 43.80 4.80 44.50Q6.65 45.20 8.40 45.20Q9.60 45.20 10.96 45.01Q12.33 44.83 13.53 44.19Q14.73 43.55 15.49 42.24Q16.25 40.92 16.25 38.70Q16.25 35.73 14.28 33.96Q12.30 32.20 8.65 32.20Q7.25 32.20 5.81 32.46Q4.38 32.72 3.23 33.10Q2.08 33.47 1.55 33.80L2.20 15.15L21.50 15.15L21.50 20.45L7.90 20.45L7.40 27.90Q8.58 27.55 9.71 27.42Q10.85 27.30 12.20 27.30Q17.50 27.30 20.25 30.21Q23 33.13 23 38.05Q23 41.95 21.26 44.77Q19.53 47.60 16.43 49.13Q13.33 50.65 9.25 50.65ZM39.55 50.90Q35 50.90 32.20 48.56Q29.40 46.23 28.13 42.11Q26.85 38 26.85 32.65Q26.85 23.30 30.19 18.80Q33.52 14.30 39.55 14.30Q45.60 14.30 48.92 18.80Q52.25 23.30 52.25 32.65Q52.25 38 50.98 42.11Q49.70 46.23 46.90 48.56Q44.10 50.90 39.55 50.90M39.60 45.55Q41.75 45.55 42.99 43.84Q44.23 42.13 44.74 39.19Q45.25 36.25 45.25 32.60Q45.25 28.75 44.71 25.81Q44.17 22.88 42.94 21.21Q41.70 19.55 39.60 19.55Q37.48 19.55 36.21 21.21Q34.95 22.88 34.40 25.81Q33.85 28.75 33.85 32.60Q33.85 36.25 34.39 39.19Q34.92 42.13 36.19 43.84Q37.45 45.55 39.60 45.55ZM68.55 50.90Q64 50.90 61.20 48.56Q58.40 46.23 57.13 42.11Q55.85 38 55.85 32.65Q55.85 23.30 59.19 18.80Q62.52 14.30 68.55 14.30Q74.60 14.30 77.92 18.80Q81.25 23.30 81.25 32.65Q81.25 38 79.97 42.11Q78.70 46.23 75.90 48.56Q73.10 50.90 68.55 50.90M68.60 45.55Q70.75 45.55 71.99 43.84Q73.22 42.13 73.74 39.19Q74.25 36.25 74.25 32.60Q74.25 28.75 73.71 25.81Q73.17 22.88 71.94 21.21Q70.70 19.55 68.60 19.55Q66.47 19.55 65.21 21.21Q63.95 22.88 63.40 25.81Q62.85 28.75 62.85 32.60Q62.85 36.25 63.39 39.19Q63.92 42.13 65.19 43.84Q66.45 45.55 68.60 45.55Z"
                        />
                    </g>
                </g>
            </g>
        </svg>
        <div class="content">
            <h1 class="title">Oops! Something Went Wrong</h1>
            <p class="description">
                We're sorry, but an unexpected error occurred. Please try again later or return to
                the homepage.
            </p>
            <v-btn color="primary" class="mt-6" size="large" to="/" elevation="2">
                Return to Homepage
            </v-btn>
        </div>
    </div>
</template>

<style scoped>
.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 64px);
    position: relative;
    padding: 0 20px;
    overflow: hidden;
}

.background-svg {
    position: fixed;
    width: 80vw;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.05;
    top: 50%;
}

@media (max-width: 768px) {
    .background-svg {
        top: 20%;
    }
}

.content {
    text-align: center;
    max-width: 600px;
    z-index: 1;
}

.title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #333;
}

.description {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #666;
    margin-bottom: 1.5rem;
}
</style>
