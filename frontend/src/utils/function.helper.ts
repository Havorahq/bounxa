// 

export const truncateString = (obj: string, length: number) => {
  if (obj) {
    if (obj.length > length) {
      const myTruncatedString = obj.substring(0, length);
      return `${myTruncatedString}...`
    }
    return obj
  }
  return ''
}