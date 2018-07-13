
// delegating class
class DataProcessor {
    asyncExecution(error, data) {
        const self = this;
        if (error) throw error;
        try {
            const lines = JSON.parse(data.toString());
            let index = 0;
            var emitInterval = setInterval(() => {
                if (index < lines.length) {
                    self.emit('countrydata', {
                        country: lines[index].country,
                        city: lines[index].city,
                        index: index
                    });
                } else {
                    console.log("...end");
                    clearInterval(emitInterval);
                    console.log("app stop");
                }

                index++;
            }, 1000);
        } catch (error) {
            throw error;
        }
    }

    /*** NOT ready 
    streamExecution() {
        let accumulated = "", index = 0;

        let withLines = (lines) => {
            lines.forEach(function (line) {
                console.log(index + " " + line);
                index++;
            });
        }

        let onData = (data) => {
            //console.log("\n \n \n" + data);
            var parts = (accumulated + data).split("\n");
            accumulated = parts.pop();
            withLines(parts);
        };

        let onEnd = () => {
            if (accumulated.length > 0) {
                withLines(accumulated.split("\n"));
            }
            console.log("end");
        }

        return { onData, onEnd };
    }*/
}

module.exports = new DataProcessor();