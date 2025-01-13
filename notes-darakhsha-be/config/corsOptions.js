// config/corsOptions.js
const whitelist = [
    
    'https://notes-app-2pse.onrender.com',
    'http://localhost:8000',     
    'http://localhost:5173',    
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,  
    maxAge: 86400,  
  };
  
  export default corsOptions;