function convertToCsv(data) {
    let csv = '';

    let objectKeys = Object.keys(data[0]);
    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            for (let j = 0; j < objectKeys.length; j++) {
                csv += '"' + objectKeys[j] + '",';
            }
        }
        csv += '\n';
        for (let j = 0; j < objectKeys.length; j++) {
            if (typeof data[i][objectKeys[j]] === 'string') {
                // replace all " with \"
                data[i][objectKeys[j]].replace(/"/g, '\"');
                // enclose the string in "
                csv += '"' + data[i][objectKeys[j]] + '",';
            } else if (typeof data[i][objectKeys[j]] === 'number') {
                csv += data[i][objectKeys[j]] + ',';
            } else {
                csv += '"",';
            }
        }
    }

    return csv;
}

module.exports = convertToCsv;