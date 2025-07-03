const tmi = require('tmi.js');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;

// Serve files from the 'public' folder
app.use(express.static('public'));

// Chat tracking
let messages = [];
let wordCounts = {};
let importantWords = ['save', 'dog', 'remind']; // Editable list

const timeWindow = 30 * 1000; // 30 seconds

// Twitch client setup
const client = new tmi.Client({
    channels: ['cinnamunchlive'] // 👈 Replace with your Twitch channel name
});

client.connect();

// On Twitch message
client.on('message', (channel, tags, message, self) => {
    if (self) return;

    const timestamp = Date.now();
    messages.push({ message, timestamp });

    // Remove messages older than timeWindow
    messages = messages.filter(msg => timestamp - msg.timestamp <= timeWindow);

    // Recount all words
    wordCounts = {};
    messages.forEach(msg => {
        const words = msg.message.toLowerCase().split(/\s+/);
        words.forEach(word => {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        });
    });

    // Top 5 words
    const topWords = Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    io.emit('topWords', topWords);

    // Count important words
    const foundImportantWords = messages.flatMap(msg => {
        const words = msg.message.toLowerCase().split(/\s+/);
        return words.filter(word => importantWords.includes(word));
    });

    const importantCounts = {};
    foundImportantWords.forEach(word => {
        importantCounts[word] = (importantCounts[word] || 0) + 1;
    });

    io.emit('importantWords', importantCounts);
    io.emit('importantList', importantWords);
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    // Send current important word list
    socket.emit('importantList', importantWords);

    // Add new word
    socket.on('addImportantWord', word => {
        if (!importantWords.includes(word)) {
            importantWords.push(word);
            io.emit('importantList', importantWords);
        }
    });

    // Remove a word
    socket.on('removeImportantWord', word => {
        importantWords = importantWords.filter(w => w !== word);
        io.emit('importantList', importantWords);
    });
});

http.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
