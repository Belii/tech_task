var syntax 				= 'sass'//, // Syntax: sass or scss;
//		gulpversion 	= '4'; // Gulp version: 3 or 4

var	gulp					= require('gulp'),
		concat 				= require('gulp-concat'),
		browserSync		= require('browser-sync'),
		autoprefixer 	= require('gulp-autoprefixer'),
		uglify 				= require('gulp-uglify'),
		del 					= require('del'),
		imagemin 			= require('gulp-imagemin'),
		cache 				= require('gulp-cache'),
		csso 					= require('gulp-csso'),
//		cleancss      = require('gulp-clean-css'),
		rename 				= require('gulp-rename'),
		gutil					= require('gulp-util' ),
		sass 					= require('gulp-sass'),
		notify 				= require('gulp-notify');

// server watching folder dest 
gulp.task('server', function(){
	browserSync.init({
		server: {
			baseDir: 'dest'
		},
		tunnel: false/*"ValenDance"*/ /*true*/,
		notify: false
	});
	browserSync.watch('dest', browserSync.reload)
});


// gulp.task('sass', function() { // Создаем таск Sass
// 	return gulp.src('sass/**/*.sass') // Берем источник
// 		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
// 		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
// 		.pipe(gulp.dest('dest/css')) // Выгружаем результата в папку app/css
// //		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
// });


/*gulp.task('css-libs', function() {
	return gulp.src('app/sass/libs.sass') // Выбираем файл для минификации
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});*/

gulp.task('styles', function() {// Создаем таск Sass
	return gulp.src(''+syntax+'/**/*.'+syntax+'')// Берем источник
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError("Error: <%= error.message %>"))) // Преобразуем Sass в CSS посредством gulp-sass , outputStyle: 'expanded' - для того что бы у нас появился развернутый cssm не сжатый, не с минифицированый
	.pipe(rename({ suffix: '.min', prefix : '' })) // Добавляем суффикс .min
	.pipe(autoprefixer(['last 15 versions'])) // Создаем префиксы
	//.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(csso()) // Сжимаем
	.pipe(gulp.dest('dest/css')) // Выгружаем в папку dest/css
	//.pipe(browserSync.stream())
});


gulp.task('img', function() {
//	return gulp.src('app/img/**/*') // Берем все изображения из app
	return gulp.src('src/img/**/*.+(jpg|png|ico|svg|gif)')
		.pipe(cache(imagemin({ // С кешированием
		// .pipe(imagemin({ // Сжимаем изображения без кеширования
									optimizationLevel: 3,
									interlaced: true,
									progressive: true,
									svgoPlugins: [{removeViewBox: false}]//,
			//use: [pngquant()]
									})
							))
		.pipe(gulp.dest('dest/img')); // Выгружаем на продакшен
});

gulp.task('fonts', function () {
	return gulp.src('./src/fonts/**/*')
				.pipe(gulp.dest('dest/fonts'))
});

gulp.task('html', function () {
	return gulp.src('./src/*.html')
				.pipe(gulp.dest('dest'))
});

gulp.task('video', function () {
	return gulp.src('./src/video/**/*.webm')
				.pipe(gulp.dest('dest/video'))
});

gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'src/libs/jquery/jquery-3.3.1.min.js',// Берем jQuery
		'src/js/common.js' // Always at the end
		])
	.pipe(concat('scripts.min.js')) // Собираем их в кучу в новом файле script.min.js
	.pipe(uglify()) // Minify js (opt.)
	.pipe(gulp.dest('dest/js')) // Выгружаем в папку dest/js
//	.pipe(browserSync.reload({ stream: true }))
});

/*gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});*/

gulp.task('clean', function() {
//gulp.task('clean', async function() {
	return del(['dest']); // Удаляем папку dist перед сборкой
//	return del.sync('dest'); // Удаляем папку dist перед сборкой
});

gulp.task('clear', function (callback) {
//gulp.task('clear', function () {
	return cache.clearAll();
});


// gulp.task('watch', function() {
// 	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); // Наблюдение за sass файлами
// 	gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
// 	gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
// });
// gulp.task('default', gulp.parallel('css-libs', 'sass', 'scripts', 'browser-sync', 'watch'));
// gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass', 'scripts'));


gulp.task('watch', function(){
					gulp.watch('src/*.html', gulp.series('html')) // Наблюдение за HTML файлами в корне проекта
					gulp.watch(''+syntax+'/**/*.'+syntax+'', gulp.series('styles')) // Наблюдение за sass файлами
					gulp.watch(['src/libs/jquery/dest/jquery.min.js','src/js/common.js'], gulp.series('scripts')) // Наблюдение за главным JS файлом и за библиотеками
					gulp.watch('src/fonts/**/*', gulp.series('fonts'))
});

gulp.task('build', gulp.series('clean',	
												gulp.parallel('styles', 'scripts', 'html', 'img', 'fonts', 'video'),
												gulp.parallel('watch', 'server')
));


// if (gulpversion == 4) {
// 	gulp.task('watch', function() {
// 		gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
// 		gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
// 		gulp.watch('app/*.html', gulp.parallel('code'))
// 	});
// 	gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));
// }

// if (gulpversion == 3) {
// 	gulp.task('watch', ['styles', 'scripts', 'browser-sync'], function() {
// 		gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
// 		gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['scripts']);
// 		gulp.watch('app/*.html', ['code'])
// 	});
// 	gulp.task('default', ['watch']);
// }
