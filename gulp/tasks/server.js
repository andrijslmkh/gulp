export const server = (done) => {
  app.plugins.browsersync.init({
    server: {
      baseDir: "./",
      directory: true,
      watch: true,
    },
    notify: false,
    port: 8000,
    ui: {
      port: 8080,
    },
  });
};
