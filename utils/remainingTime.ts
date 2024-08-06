export const convertDateTimeToSeconds = (dateTimeString: any) => {
    const expirationDateFromDatabase = new Date(dateTimeString);
    const currentDateTime = new Date();
    const remainingSeconds = Math.floor(
        (expirationDateFromDatabase.getTime() - currentDateTime.getTime()) / 1000
    );
    return remainingSeconds;
}


export const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
};
