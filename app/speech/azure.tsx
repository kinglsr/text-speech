"use client";
import React, { useEffect, useState } from "react";
// @ts-ignore
import createSpeechServicesPonyfill from "web-speech-cognitive-services";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import getTokenorRefresh from "@/lib/token";

const Dictaphone = () => {
  const [authToken, setAuthToken] = useState(null);
  const REGION = "eastus";

  useEffect(() => {
    const fetchToken = async () => {
      const AUTHORIZATION_TOKEN = await getTokenorRefresh();
      console.log("AUTHORIZATION_TOKEN", AUTHORIZATION_TOKEN.authTOKEN);
      setAuthToken(AUTHORIZATION_TOKEN.authTOKEN);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (authToken) {
      const { SpeechRecognition: AzureSpeechRecognition } =
        createSpeechServicesPonyfill({
          credentials: {
            region: REGION,
            authorizationToken: authToken,
          },
        });
      SpeechRecognition.applyPolyfill(AzureSpeechRecognition);
    }
  }, [authToken]);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      <button onClick={startListening}>Start</button>
      <button onClick={SpeechRecognition.abortListening}>Abort</button>
      <button onClick={resetTranscript}>Reset</button>
      <div className="mt-4 rounded-lg bg-gray-800 p-4 text-center font-thin text-white shadow-lg">
        {transcript.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default Dictaphone;
