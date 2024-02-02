export async function POST() {
  const speechKey = process.env.SPEECH_KEY || "";
  const speechRegion = process.env.SPEECH_REGION;
  try {
    const tokenResponse = await fetch(
      `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": speechKey, // Add a default value if speechKey is undefined
          "Content-Type": "application/x-www-form-urlencoded",
          "Ocp-Apim-Subscription-Region": "eastus",
        },
      }
    );
    const data = await tokenResponse.text(); // Read the response as text instead of JSON
    // Return the token as a JSON response data.token with speechRegion as a data.region property
    return new Response(JSON.stringify({ token: data, region: speechRegion }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.log("Error in processing stream or creating question:", error);
    return new Response("Error!!", {
      status: 303,
    });
  }
}
