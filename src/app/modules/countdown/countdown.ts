// getNextOccurrenceOfDate function is used to get the next occurrence of a date e.g. 2022/9/5 6:00 AM will return 2023/9/5 6:00 AM
const nextOccurrenceOfDate = (date: Date): Date  => {
  const today = new Date()
  if (date.getTime() > today.getTime()) {
    return date
  }

  // clone to prevent unnecessary mutation
  const newDate = new Date(date.getTime())
  if (new Date(newDate.setFullYear(today.getFullYear())).getTime() < today.getTime()) {
    newDate.setFullYear(newDate.getFullYear() + 1)
  }

  return newDate
}

// getCountdown function is used to get the countdown of the marathon
export const countdown = (marathonDate: Date): string => {
  const displayDate = nextOccurrenceOfDate(marathonDate)
  const elapsed = displayDate.getTime() - (new Date()).getTime()
  const rtf = new Intl.RelativeTimeFormat("en", {style: "long"})
  const countdown: string[] = []
  const units = {
    day   : 24 * 60 * 60 * 1000,
    hour  : 60 * 60 * 1000,
    minute: 60 * 1000,
  }

  const timeRemaining = {
    day: Math.floor(elapsed / units.day),
    hour: Math.floor(elapsed / units.hour) % 24,
    minute: Math.floor(elapsed / units.minute) % 60,
  }

  Object.entries(timeRemaining).forEach(([unit, val]) => {
    if (val > 0) {
      countdown.push(`${val}${rtf.formatToParts(val, <"day" | "hour" | "minute">unit)[2].value}`)
    }
  })

  // This appends and to the last item, refactor this on the future to use Intl.ListFormat
  if (countdown.length > 1) {
    const lastItem = countdown.pop()
    countdown.push(`and ${lastItem}`)
  }

  return countdown.join(" ")
}
