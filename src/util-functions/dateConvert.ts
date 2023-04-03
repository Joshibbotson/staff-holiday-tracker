export default function dateConvert(
    seconds: number,
    nanoseconds: number
): Date {
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    return new Date(milliseconds);
}
