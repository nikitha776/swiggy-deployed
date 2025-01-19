import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/restaurant", async (req, res) => {
    try {
        const response = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=16.5061743&lng=80.6480153&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
            {
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Referer": "https://www.swiggy.com/",
                    "Origin": "https://www.swiggy.com",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send("Error fetching restaurant data");
    }
});

app.get('/api/menu/:resId', async (req, res) => {
    const { resId } = req.params;
    try {
        const response = await fetch(
            `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=16.5061743&lng=80.6480153&restaurantId=${resId}`,
            {
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Referer": "https://www.swiggy.com/",
                    "Origin": "https://www.swiggy.com",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send("Error fetching menu data");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
