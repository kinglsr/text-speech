"use server";
import { cookies } from "next/headers";

export default async function getTokenorRefresh() {
  const cookieStore = cookies();
  const speechToken = cookieStore.get("speech-token") as string | undefined;
  if (speechToken === undefined) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/speechtoken`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      const token = data.token as string | undefined;
      const region = data.region as string | undefined;
      cookies().set("speech-token", token || "", {
        maxAge: 540,
        path: "/",
      });
      console.log("Token fetched from back-end: " + token, region);
      return token;
    } catch (error: any) {
      console.log("Error in processing stream or creating question:", error);
      return "Error!!";
    }
  } else {
    // @ts-ignore
    console.log("Token fetched from cookie: " + speechToken.value || "");
    // @ts-ignore
    return speechToken.value || "";
  }
}
