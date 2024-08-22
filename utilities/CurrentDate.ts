export default function CurrentDate(): string {
  const now: Date = new Date();
  const day: string = now.getDate().toString().padStart(2, "0");
  const month: string = (now.getMonth() + 1).toString().padStart(2, "0");
  const year: string = now.getFullYear().toString();
  const hours: string = now.getHours().toString().padStart(2, "0");
  const minutes: string = now.getMinutes().toString().padStart(2, "0");
  const seconds: string = now.getSeconds().toString().padStart(2, "0");

  const formattedDate: string =  `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}
