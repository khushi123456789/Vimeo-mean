const express = require('express');
const app = express();
const PORT = 3000;

app.get('/videos', (req, res) => {
    let industry = 'accounting';
    let employeeSize = 10000;
    let engagementRate = 3;

    // Connect with Sales Navigator and fetch list of companies with employee size greater than 10,000
    const companyNameList = fetchCompanyNames(industry, employeeSize);

    // Fetch videos from vimeo and store in the database
    companyNameList.forEach(companyName => {
        fetchVideos(companyName).then(videoList => {
            videoList.forEach(video => {
                let videoRecord = new Video({
                    companyName: companyName,
                    videoURL: video.url,
                    videoCategory: video.category,
                    engagementRate: video.engagementRate
                });
                // Save the video in the database
                videoRecord.save();
            });
        });
    });

    // Fetch videos from database with engagement rate greater than 3
    Video.find({ engagementRate: {$gt: engagementRate }}, (err, videoList) => {
        if (err || !videoList) {
            return res.status(404).json({
                message: "Videos not found"
            });
        }
        res.status(200).json(videoList);
    });
});
app.listen(PORT);

// Fetch videos from vimeo
const fetchVideos = (companyName) => {
    return new Promise(resolve => {
        // Fetch list of videos from Vimeo
        let videoList = [];
        // Calculate engagement rate
        videoList.forEach(video => {
            video.engagementRate = calculateEngagementRate(video.likes, video.views);
        });
        resolve(videoList);
    });
}

// Calculate Engagement Rate
const calculateEngagementRate = (likes, views) => {
    return (likes / views) * 100;
}

// Fetch Company Names
const fetchCompanyNames = (industry, employeeSize) => {
    // Connect with Sales Navigator and fetch list of companies with employee size greater than 10,000
    return companyNameList;
}