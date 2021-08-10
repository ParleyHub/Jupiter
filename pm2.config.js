module.exports = {
  apps: [
    {
      name: 'jupiter',
      script: 'server.js',
      merge_logs: true,
      max_restarts: 20,
      instances: 4,
      max_memory_restart: '200M',
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
      },
    },
  ],
};
