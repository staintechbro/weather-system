export default async function handler(req, res) {
  try {
    const { lat, lon, units = 'metric', ai = 'true' } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        error: 'Latitude and longitude are required',
      });
    }

    const apiResponse = await fetch(
      `https://api.weather-ai.co/v1/weather?lat=${lat}&lon=${lon}&units=${units}&ai=${ai}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.WEATHER_AI_KEY}`,
        },
      }
    );

    const data = await apiResponse.json();

    return res.status(apiResponse.status).json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Server error',
      message: error.message,
    });
  }
}




