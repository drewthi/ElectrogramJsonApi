
const filenamesRoutes = (app, fs) => {
    const dirPath = './data/recordings/';

    function getFileNames(arr, callback) {
        // read recording file names
        // console.log("DIRPATH HERE");
        // console.log(dirPath);
        fs.readdir(dirPath, (err, files) => {
            // console.log("getFileNames()");
            // console.log(err);
            // console.log(files);
            files.forEach(file => {
                arr.push(file);
            });
            console.log("got file names");
            callback(arr);
        });
    }

    // READ
    // Notice how we can make this 'read' operation much more simple now.
    app.get("/filenames", (req, res) => {
        const { query: { id } } = req;
        getFileNames([], (recordings) => {
            res.status(200).json({
                method: 'GET', 
                endpoint: 'filenames',
                files: recordings
            });
        });
    });
};

module.exports = filenamesRoutes;
