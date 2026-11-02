function formatTime(totalSeconds) {
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = totalSeconds % 60

    let formattedMins = String(minutes).padStart(2, "0")
    let formattedSecs = String(seconds).padStart(2, "0")
    return formattedMins + ":" + formattedSecs
}