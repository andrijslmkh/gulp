// basic modules
import gulp from "gulp";

// import paths
import { path } from "./gulp/config/path.js";

// import plagins
import { plugins } from "./gulp/config/plugins.js";

// transfer the value to the global variable
global.app = {
  gulp: gulp,
  path: path,
  plugins: plugins,
};

// import tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprit } from "./gulp/tasks/svgSprite.js";

// file change watcher
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

export { svgSprit };

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
);

// construction of a scheme for completing tasks
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

// execution of the script by default
gulp.task("default", dev);
