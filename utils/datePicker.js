//resuable date picker function
export function datePicker() {
    const date = new Date()
    const year = date.getFullYear()
    const day = date.getDate()
    const dayIndex = date.getDay()
  
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
    const dayOfWeek = daysOfWeek[dayIndex]
    const month = months[date.getMonth()]
  
    return {
      formatted: `${dayOfWeek} ${day} ${month} ${year}`,
      year,
      day,
      dayOfWeek,
      month,
    }
  }