
const fileRoutes = (app, fs) => {
    const dirPath = './data/recordings/';

    function getFileNames(arr, callback) {
        // read recording file names
        console.log("DIRPATH HERE");
        console.log(dirPath);
        fs.readdir(dirPath, (err, files) => {
            console.log("getFileNames()");
            console.log(err);
            console.log(files);
            files.forEach(file => {
                arr.push(file);
            });
            console.log("got file names");
            callback(arr);
        });
    }

    // READ
    // Notice how we can make this 'read' operation much more simple now.
    app.get("/file/:file", (req, res) => {
        const file = req.params['file'];
        getFileNames([], (recordings) => {
            const parsedFileIdx = parseInt(file);
            if (!isNaN(parsedFileIdx) && parsedFileIdx < recordings.length) {
                let recordingData = {};
                const file = recordings[parsedFileIdx];
                fs.readFile(dirPath + file, (err, data) => {
                    if (err) throw err;
                    recordingData = JSON.parse(data);
                    res.status(200).json({
                        method: 'GET', 
                        endpoint: 'file',
                        file: recordingData
                    });
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'Not Found'
                });
            }
        });
    });
};

module.exports = fileRoutes;
