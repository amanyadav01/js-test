const getSubsetOfExpensiveClicks = (clicks) => {
    const hourInMillis = 60 * 60 * 1000; // One hour in milliseconds
    const clickMap = {}; // Store the most expensive click for each IP in each one hour period
    const ipCountMap = {}; // Count the number of clicks for each IP

    for (const click of clicks) {
        const { ip, timestamp, amount } = click;

        // If the IP has more than 10 clicks, skip it
        if (ipCountMap[ip] && ipCountMap[ip] > 10) {
            continue;
        }
        // If the IP exists in the clickMap
        if (clickMap[ip]) {
            const { maxAmount, earliestTimestamp } = clickMap[ip];
            // Calculate the hour period
            const currTimestap = new Date(timestamp).getTime()
            const previousTimeStamp = new Date(earliestTimestamp).getTime()
            const hourDifference = Math.abs(Math.floor((currTimestap - previousTimeStamp) / hourInMillis))
            // If the current click is more expensive than the stored click for the hour period, update it
            if ((amount > maxAmount || amount === maxAmount) && hourDifference <= 1) {
                clickMap[ip] = { maxAmount: amount, earliestTimestamp: timestamp };
            }
        } else {
            // If the IP doesn't exist in the clickMap, add the click to it
            clickMap[ip] = { maxAmount: amount, earliestTimestamp: timestamp };
        }

        // Increment the click count for the IP
        ipCountMap[ip] = (ipCountMap[ip] || 0) + 1;
    }

    // Convert the clickMap into an array of click objects
    const result = Object.keys(clickMap).map((ip) => ({
        ip,
        timestamp: clickMap[ip].earliestTimestamp,
        amount: clickMap[ip].maxAmount,
    }));
    return result;
};

const data = [
    { "ip": "22.22.22.22", "timestamp": "3/11/2020 02:02:58", "amount": 7.0 },
    { "ip": "11.11.11.11", "timestamp": "3/11/2020 02:12:32", "amount": 6.5 },
    { "ip": "11.11.11.11", "timestamp": "3/11/2020 02:13:11", "amount": 7.25 },
    { "ip": "44.44.44.44", "timestamp": "3/11/2020 02:13:54", "amount": 8.75 },
    { "ip": "22.22.22.22", "timestamp": "3/11/2020 05:02:45", "amount": 11.0 },
    { "ip": "44.44.44.44", "timestamp": "3/11/2020 06:32:42", "amount": 5.0 },
    { "ip": "22.22.22.22", "timestamp": "3/11/2020 06:35:12", "amount": 2.0 },
    { "ip": "11.11.11.11", "timestamp": "3/11/2020 06:45:01", "amount": 12.0 },
    { "ip": "11.11.11.11", "timestamp": "3/11/2020 06:59:59", "amount": 11.75 },
    { "ip": "22.22.22.22", "timestamp": "3/11/2020 07:01:53", "amount": 1.0 },
    { "ip": "11.11.11.11", "timestamp": "3/11/2020 07:02:54", "amount": 4.5 },
    { "ip": "33.33.33.33", "timestamp": "3/11/2020 07:02:54", "amount": 15.75 },
    { "ip": "66.66.66.66", "timestamp": "3/11/2020 07:02:54", "amount": 14.25 },
    { "ip": "22.22.22.22", "timestamp": "3/11/2020 07:03:15", "amount": 12.0 },
    { "ip": "22.22.22.22", "timestamp": "3/11/2020 08:02:22", "amount": 3.0 },
    { "ip": "22.22.22.22", "timestamp": "3/11/2020 09:41:50", "amount": 4.0 },
    { "ip": "22.22.22.22", "timestamp": "3/11/2020 10:02:54", "amount": 5.0 },
    { "ip": "22.22.22.22", "timestamp": "3/11/2020 11:05:35", "amount": 10.0 },
    { "ip": "22.22.22.22", "timestamp": "3/11/2020 13:02:21", "amount": 6.0 },
    { "ip": "55.55.55.55", "timestamp": "3/11/2020 13:02:40", "amount": 8.0 },
    { "ip": "44.44.44.44", "timestamp": "3/11/2020 13:02:55", "amount": 8.0 },
    { "ip": "55.55.55.55", "timestamp": "3/11/2020 13:33:34", "amount": 8.0 },
    { "ip": "55.55.55.55", "timestamp": "3/11/2020 13:42:24", "amount": 8.0 },
    { "ip": "55.55.55.55", "timestamp": "3/11/2020 13:47:44", "amount": 6.25 },
    { "ip": "55.55.55.55", "timestamp": "3/11/2020 14:02:54", "amount": 4.25 },
    { "ip": "55.55.55.55", "timestamp": "3/11/2020 14:03:04", "amount": 5.25 },
    { "ip": "55.55.55.55", "timestamp": "3/11/2020 15:12:55", "amount": 6.25 },
    { "ip": "22.22.22.22", "timestamp": "3/11/2020 16:02:36", "amount": 8.0 },
    { "ip": "55.55.55.55", "timestamp": "3/11/2020 16:22:11", "amount": 8.5 },
    { "ip": "55.55.55.55", "timestamp": "3/11/2020 17:18:19", "amount": 11.25 },
    { "ip": "55.55.55.55", "timestamp": "3/11/2020 18:19:20", "amount": 9.0 },
    { "ip": "22.22.22.22", "timestamp": "3/11/2020 23:59:59", "amount": 9.0 }
]

const clicksSubset = getSubsetOfExpensiveClicks(data);
console.log(clicksSubset);