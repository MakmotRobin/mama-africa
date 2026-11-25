function padTwoDigits(value: number): string {
  return String(value).padStart(2, '0')
}

export function toLocalIsoDate(date: Date): string {
  const month = padTwoDigits(date.getMonth() + 1)
  const day = padTwoDigits(date.getDate())
  return `${date.getFullYear()}-${month}-${day}`
}

export function parseLocalIsoDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}
