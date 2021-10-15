module.exports = {
  apps: [
    {
      name: 'jupiter',
      script: 'server.js',
      merge_logs: true,
      max_restarts: 2,
      instances: 2,
      max_memory_restart: '500M',
      env: {
        PORT: 5000,
        NODE_ENV: 'production',
      },
    },
  ],
};
