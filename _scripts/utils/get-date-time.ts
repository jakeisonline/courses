export default function getDateTime() {
  // Enforce en-US locale for easier international reading,
  // but retain GMT time zone because that's where I am!
  const dateTime = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "GMT",
  })

  return dateTime
}
