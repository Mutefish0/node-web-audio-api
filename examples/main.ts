import fs from "node:fs";
import path from "node:path";
import { AudioContext } from "../index.mjs";

const files = [
    path.join("./", "samples", "chest.wav"),
    path.join("./", "samples", "sample-faulty.wav"),
    path.join("./", "samples", "sample.wav"),
    path.join("./", "samples", "sample.flac"),
    path.join("./", "samples", "sample.ogg"),
    path.join("./", "samples", "sample.mp3"),
    // cannot decode, format not supported or file corrupted
    path.join("./", "samples", "empty_2c.wav"),
    path.join("./", "samples", "corrupt.wav"),
    path.join("./", "samples", "sample.aiff"),
    path.join("./", "samples", "sample.webm"), // 48kHz,
];

const audioContext = new AudioContext({ latencyHint: "playback" });

for (let filepath of files) {
    console.log("> --------------------------------");

    try {
        //const arrayBuffer = fs.readFileSync(filepath).buffer;

        const db = Deno.readFileSync(filepath);

        const arrayBuffer = db.buffer;

        const buffer = await audioContext.decodeAudioData(arrayBuffer);

        console.log("> playing file: %s", filepath);
        console.log("> duration: %s", buffer.duration);
        console.log("> length: %s", buffer.length);
        console.log("> channels: %s", buffer.numberOfChannels);
        console.log("> sample rate: %s", buffer.sampleRate);
        console.log("> --------------------------------");

        const src = audioContext.createBufferSource();
        src.connect(audioContext.destination);
        src.buffer = buffer;
        src.start();

        await new Promise((resolve) => setTimeout(resolve, 4 * 1000));
    } catch (err) {
        console.log("> Error decoding audio file: %s", filepath);
        console.log(err);
        console.log("> --------------------------------");

        await new Promise((resolve) => setTimeout(resolve, 1 * 1000));
    }
}

await audioContext.close();
