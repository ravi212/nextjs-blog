export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const htmlToPlainText = (html: string) => {
  // Replace <br> tags with newlines
  const htmlString = html.replace(/<br\s*\/?>/gi, "\n");

  // Regex to match <p> tags and their content
  const regex = /<p[^>]*>(.*?)<\/p>/gi;
  let match;
  let result = [];

  // Execute regex and extract text content
  while ((match = regex.exec(htmlString)) !== null) {
    //@ts-ignore
    result.push(match[1]);
  }

  return result.join("\n");
};

export function formatDate(dateString: any) {
  const date = new Date(dateString)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthName = months[date?.getMonth()];
  const day = String(date?.getDate())?.padStart(2, '0');
  const year = date?.getFullYear();

  return `${day} ${monthName} ${year}`;
}