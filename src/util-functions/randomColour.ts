export function randomColour(): string {
    let a = 200;
    let b = 100;
    let c = Math.floor(Math.random() * (200 - 100) + 100);
    let rgbArr = [a, b, c];
    let finalRgbArr = [];

    for (let i = -2; i < rgbArr.length; i++) {
        let rand = Math.floor(Math.random() * rgbArr.length);
        finalRgbArr.push(rgbArr[rand]);
        rgbArr.splice(rand, 1);
    }

    return `rgb(${finalRgbArr[0]}, ${finalRgbArr[1]}, ${finalRgbArr[2]})`;
}
randomColour();
