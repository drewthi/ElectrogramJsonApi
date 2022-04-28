
const annotationnamesRoutes = (app, fs) => {
    const annotationPath = './data/annotations/';

    function getAnnotationNames(arr, callback) {
        // read recording file names
        fs.readdir(annotationPath, (err, files) => {
            files.forEach(file => {
                arr.push(file);
            });
            callback(arr);
        });
    }

    // READ
    // Notice how we can make this 'read' operation much more simple now.
    app.get("/annotationnames", (req, res) => {
        getAnnotationNames([], (annotationfiles) => {
            res.status(200).json({
                method: 'GET', 
                endpoint: 'annotationnames',
                files: annotationfiles
            });
        });
    });
};

module.exports = annotationnamesRoutes;
