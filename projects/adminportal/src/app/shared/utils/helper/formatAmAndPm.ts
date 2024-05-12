export function formatTime(time: string): string {
  if(time) {
    const [hours, minutes, seconds] = time?.split(':');
    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    date.setSeconds(Number(seconds.split('.')[0]));

    const formattedTime = this.formatAMPM(date);
    return formattedTime;
  }

}
export function formatAMPM(date: Date): string {
  let hours = date.getHours();
  let minutes: any = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutes} ${ampm}`;
}
