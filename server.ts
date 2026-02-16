import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server as SocketIOServer } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url!, true);
            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('internal server error');
        }
    });

    const io = new SocketIOServer(server, {
        cors: {
            origin: process.env.APP_URL || 'http://localhost:3000',
            methods: ['GET', 'POST'],
        },
    });

    // WebSocket connection handling
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        // Join interview room
        socket.on('join-interview', (interviewId: string) => {
            socket.join(`interview-${interviewId}`);
            console.log(`Socket ${socket.id} joined interview ${interviewId}`);
        });

        // Leave interview room
        socket.on('leave-interview', (interviewId: string) => {
            socket.leave(`interview-${interviewId}`);
            console.log(`Socket ${socket.id} left interview ${interviewId}`);
        });

        // Transcript streaming
        socket.on('transcript-chunk', (data: {
            interviewId: string;
            questionId?: string;
            speaker: 'INTERVIEWER' | 'CANDIDATE';
            text: string;
            timestamp: number;
        }) => {
            // Broadcast to all clients in the interview room
            io.to(`interview-${data.interviewId}`).emit('transcript-update', data);
        });

        // Question navigation
        socket.on('question-change', (data: {
            interviewId: string;
            questionId: string;
        }) => {
            io.to(`interview-${data.interviewId}`).emit('question-changed', data);
        });

        // Question visibility toggle
        socket.on('question-visibility', (data: {
            interviewId: string;
            questionId: string;
            visible: boolean;
        }) => {
            io.to(`interview-${data.interviewId}`).emit('question-visibility-changed', data);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    server
        .once('error', (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
