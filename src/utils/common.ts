export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const htmlToPlainText = (html: string) => {
    // Extract the content inside <p> tags
    let paragraphs = html.match(/<p[^>]*>(.*?)<\/p>/gi);
    
    if (!paragraphs) {
        return ''; // Return empty string if no paragraphs are found
    }
    
    // Remove all HTML tags from the content inside <p> tags and join paragraphs with newlines
    let text = paragraphs
        .map(p => p.replace(/<\/?p[^>]*>/gi, '')) // Remove <p> tags
        .map(p => p.replace(/<[^>]+>/g, '')) // Remove any remaining HTML tags
        .join('\n'); // Join paragraphs with newline

    // Replace multiple newlines with a single space
    text = text.replace(/\n+/g, ' ').replace(/&nbsp;/g, '').trim(); // Replace newlines with a single space and trim extra spaces

    return text;
};

export function formatDate(dateString: any) {
  const date = new Date(dateString)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthName = months[date?.getMonth()];
  const day = String(date?.getDate())?.padStart(2, '0');
  const year = date?.getFullYear();

  return `${day} ${monthName} ${year}`;
}

export function updateLinksTarget(htmlString) {
  // Create a new DOM parser
  const parser = new DOMParser();
  
  // Parse the HTML string
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  // Select all <a> tags
  const links = doc.querySelectorAll('a');
  
  // Update each <a> tag to have target="_blank"
  links.forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer'); // For security reasons
  });
  
  // Return the updated HTML string
  return doc.body.innerHTML;
}