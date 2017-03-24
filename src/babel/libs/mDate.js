class MDate extends Date {
  constructor(...args) {
    super(...args)

    return Object.setPrototypeOf(new Date( ...args ), MDate.prototype)
  }

  getFullValue(val, digit = val.toString().length, char = '0') {
    let blank = ''

    for(let i = 1; i < digit; i++) {
      blank += char
    }

    for(let i = 1; i <= digit; i++) {
      if(val < Math.pow(10, i)) {
        return (blank + val)
      }

      blank = blank.slice(1)
    }

    throw new Error('value length exceeds specified digit.')
  }

  getFullDate() {
    return this.getFullValue(
      this.getDate(),
      2,
    )
  }

  getFullHours() {
    return this.getFullValue(
      this.getHours(),
      2,
    )
  }

  getFullMilliseconds() {
    return this.getFullValue(
      this.getMilliseconds(),
      3,
    )
  }

  getFullMinutes() {
    return this.getFullValue(
      this.getMinutes(),
      2,
    )
  }

  getFullMonth() {
    return this.getFullValue(
      this.getMounth(),
      2,
    )
  }

  getFullSeconds() {
    return this.getFullValue(
      this.getSeconds(),
      2,
    )
  }

  getDayName() {
    return this.getFullDayName().slice(0, 3)
  }

  getFullDayName() {
    switch(this.getMonth()) {
      case 0:
        return 'Sunday'
        break

      case 1:
        return 'Monday'
        break

      case 2:
        return 'Tuesday'
        break

      case 3:
        return 'Wednesday'
        break

      case 4:
        return 'Thursday'
        break

      case 5:
        return 'Friday'
        break

      case 6:
        return 'Saturday'
        break
    }
  }

  getMonthName() {
    return this.getFullMonthName().slice(0, 3)
  }

  getFullMonthName() {
    switch(this.getMonth()) {
      case 0:
        return 'Junuary'
        break

      case 1:
        return 'February'
        break

      case 2:
        return 'March'
        break

      case 3:
        return 'April'
        break

      case 4:
        return 'May'
        break

      case 5:
        return 'June'
        break

      case 6:
        return 'July'
        break

      case 7:
        return 'August'
        break

      case 8:
        return 'September'
        break

      case 9:
        return 'October'
        break

      case 10:
        return 'November'
        break

      case 11:
        return 'December'
        break
    }
  }

  getUTCFullDate() {
    return this.getFullValue(
      this.getUTCDate(),
      2,
    )
  }

  getUTCFullHours() {
    return this.getFullValue(
      this.getUTCHours(),
      2,
    )
  }

  getUTCFullMilliseconds() {
    return this.getFullValue(
      this.getUTCMilliseconds(),
      2,
    )
  }

  getUTCFullMinutes() {
    return this.getFullValue(
      this.getUTCMinutes(),
      2,
    )
  }

  getUTCFullMonth() {
    return this.getFullValue(
      this.getUTCMonth(),
      2,
    )
  }

  getUTCFullSeconds() {
    return this.getFullValue(
      this.getUTCSeconds(),
      2,
    )
  }

  getUTCDayName() {
    return this.getUTCFullDayName().slice(0, 3)
  }

  getUTCFullDayName() {
    switch(this.getUTCMonth()) {
      case 0:
        return 'Sunday'
        break

      case 1:
        return 'Monday'
        break

      case 2:
        return 'Tuesday'
        break

      case 3:
        return 'Wednesday'
        break

      case 4:
        return 'Thursday'
        break

      case 5:
        return 'Friday'
        break

      case 6:
        return 'Saturday'
        break
    }
  }

  getUTCMonthName() {
    return this.getUTCFullMonthName().slice(0, 3)
  }

  getUTCFullMonthName() {
    switch(this.getUTCMonth()) {
      case 0:
        return 'Junuary'
        break

      case 1:
        return 'February'
        break

      case 2:
        return 'March'
        break

      case 3:
        return 'April'
        break

      case 4:
        return 'May'
        break

      case 5:
        return 'June'
        break

      case 6:
        return 'July'
        break

      case 7:
        return 'August'
        break

      case 8:
        return 'September'
        break

      case 9:
        return 'October'
        break

      case 10:
        return 'November'
        break

      case 11:
        return 'December'
        break
    }
  }
}

window.MDate = MDate
