const express = require('express');
const path = require('path');
const math = require('mathjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// API endpoint for advanced calculations
app.post('/api/calculate', (req, res) => {
    try {
        const { expression } = req.body;
        const result = math.evaluate(expression);
        res.json({ success: true, result });
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            error: 'Invalid expression',
            message: error.message 
        });
    }
});

// Serve the main page for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Calculator available at http://localhost:${PORT}`);
});
