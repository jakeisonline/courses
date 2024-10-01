export default function hrsToDaysHrs(hours: number) {
  const days = Math.floor(hours / 24)
  const daysDisplay = days > 0 ? days + (days == 1 ? " day" : " days") : null

  let adjustedHours: number

  if (days > 0) {
    adjustedHours = hours - 24 * days
  } else {
    adjustedHours = hours
  }

  const hoursDisplay =
    adjustedHours > 0
      ? adjustedHours + (adjustedHours == 1 ? " hour" : " hours")
      : null

  const hrsToDays = [daysDisplay, hoursDisplay].filter(Boolean).join(", ")

  return hrsToDays
}
