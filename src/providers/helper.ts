import { useEffect, useRef } from "react";

const url = process.env.REACT_APP_BASEURL;
const client_id = process.env.REACT_APP_CLIENT_ID;
let params = new URLSearchParams(window.location.search);
let code = params.get('code');

function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

async function authorizeUser(token: string) {
    const temp = token;
    if (!code) {
        await redirectToAuthCodeFlow(client_id);
    }
    else if (!token || token === "") {
        const tempToken = await getAccessToken(client_id, code);
        return tempToken;
    }
    return temp;
}
async function redirectToAuthCodeFlow(client_id: string | undefined) {
    // TODO: Redirect to Spotify authorization page
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", client_id!);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000");
    params.append("scope", "user-read-private user-read-email user-read-playback-state user-read-currently-playing user-modify-playback-state");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function getAccessToken(clientId: string | undefined, code: string | null) {
    // TODO: Get access token for code
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId!);
    params.append("grant_type", "authorization_code");
    params.append("code", code!);
    params.append("redirect_uri", "http://localhost:3000");
    params.append("code_verifier", verifier!);
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function get(endpoint: string, token: string, currentUser = false): Promise<any> {
    // TODO: Call Web API
    let temp = "";
    if (currentUser) {
        temp = "me/"
    }
    const result = await fetch(url + temp + endpoint, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    if (result.status === 200) {
        return await result.json();
    }
    else {
        console.log("Response: " + result.status + " from: " + result.url)
        return null;
    }

}
async function put(endpoint: string, token: string, currentUser = false): Promise<any> {
    // TODO: Call Web API
    let temp = "";
    if (currentUser) {
        temp = "me/"
    }

    const result = await fetch(url + temp + endpoint, {
        method: "PUT", headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        const r = response.status;
        console.log(r);
        return r;
    }).catch(error => {
        console.log("Error:" + error);
    })

}
async function post(endpoint: string, token: string, currentUser = false): Promise<any> {
    // TODO: Call Web API
    let temp = "";
    if (currentUser) {
        temp = "me/"
    }

    const result = await fetch(url + temp + endpoint, {
        method: "POST", headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        const r = response.status;
        console.log(r);
        return r;
    }).catch(error => {
        console.log("Error:" + error);
    })

}
export { get, put, post, authorizeUser, usePrevious };