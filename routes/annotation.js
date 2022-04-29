
const annotationRoutes = (app, fs) => {
    const dirPath = './data/recordings/';
    const annotationPath = './data/annotations/';

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

    function getAnnotationNames(arr, callback) {
        // read recording file names
        fs.readdir(annotationPath, (err, files) => {
            files.forEach(file => {
                arr.push(file);
            });
            callback(arr);
        });
    }

    // CREATE
    app.post('/annotation', (req, res) => {
        console.log("API: postannotation");
        const body = req.body;
        const annotationFileIdx = body.fileIdx;
        getFileNames([], (files) => {
            console.log(body);
            const parsedFileIdx = parseInt(annotationFileIdx);
            if (parsedFileIdx !== undefined && !isNaN(parsedFileIdx) && parsedFileIdx < files.length) {
                const file = files[parsedFileIdx];
                console.log(annotationPath + file);
                fs.writeFile(annotationPath + file, JSON.stringify(body), (err) => {
                    if (err) throw err;
                    console.log('Data written to file');
                });
                res.status(200).json({
                    method: 'GET', 
                    endpoint: 'postannotation',
                    file: file,
                    result: 'successful'
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'Not Found'
                });
            }
        });
    });


    // READ
    app.get("/annotation/:file", (req, res) => {
        const annotation = req.params['file'];
        console.log("--> get annotation");
        getFileNames([], (recordings) => {
            getAnnotationNames([], (annotations) => {
                const parsedFileIdx = parseInt(annotation);
                if (parsedFileIdx !== undefined && !isNaN(parsedFileIdx) && parsedFileIdx < recordings.length) {
                    const file = recordings[parsedFileIdx];
                    if (annotations.includes(file)) {
                        console.log("Annotation file exists");
                        fs.readFile(annotationPath + file, (err, data) => {
                            if (err) throw err;
                            let annotationData = JSON.parse(data);
                            console.log("Annotation Data vvv");
                            console.log(annotationData);
                            res.status(200).json({
                                method: 'GET', 
                                endpoint: 'getannotation',
                                fileExists: true,
                                fileName: file,
                                data: annotationData
                            });
                        });
                    } else {
                        res.status(200).json({
                            method: 'GET', 
                            endpoint: 'getannotation',
                            fileExists: false,
                            fileName: file
                        });
                    }
                } else {
                    return res.status(404).json({
                        status: 404,
                        message: 'Not Found'
                    });
                }
            });
        });
    });
};

module.exports = annotationRoutes;
