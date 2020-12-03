// Perceptron Class

// Percetron is created with n weights and learning constant
class Perceptron {
    constructor(n, lr) {
        // Array of weights for inputs
        this.weights = new Array(n);
        // Start with random weights
        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] = random(-1, 1);
        }
        // Learning Rate
        this.lr = lr;

    }

    train(inputs, target) {
        let guess = this.guess(inputs);
        let error = target - guess;
        // Tune all the weights
        for (let i = 0; i < this.weights.length; i++){
            this.weights[i] += this.lr * error * inputs[i];
        }
    }

    /**
    * Guess -1 or 1 based on input values
    * @param (array) integer - 
    * @return {int} returns the activated sum by calling the activate function
    */
    guess(inputs) {
        let sum = 0;
        for (let i = 0; i < this.weights.length; i++) {
            sum += inputs[i] * this.weights[i];
        }
        // Result is sign of the sum, -1 or 1
        return this.activate(sum);
    }

    /**
    * Activate takes whatever input recieved from the guess function and normalizes it to 1 or -1
    * @param (int) integer - the sum from Guess function
    * @return {int} returns -1 or 1
    */
    activate(sum) {
        if (sum > 0 ) return 1;
        else return -1;
    }

    // Return weights
    getWeights() {
        return this.weights;
    }


}

