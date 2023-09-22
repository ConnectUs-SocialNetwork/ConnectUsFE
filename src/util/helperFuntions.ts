import Post from "../model/response/Post";
import Posts from "../model/response/PostsResponse";

export function imageToBase64(imageFile: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        resolve(event.target.result);
      } else {
        reject(new Error('Failed to read image as base64.'));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(imageFile);
  });
}

export function calculateTimeAgo(parsedDateTime: Date): string {
  const now = new Date();
  const timeDifferenceInMilliseconds = now.getTime() - parsedDateTime.getTime();

  // Izračunaj vreme u satima, danima i mesecima
  const hoursAgo = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
  const daysAgo = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));
  const monthsAgo = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 30));

  // Formiraj odgovarajući string
  if (monthsAgo > 0) {
    return `${monthsAgo}m`;
  } else if (daysAgo > 0) {
    return `${daysAgo}d`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo}h`;
  } else {
    return "Nedavno"; // Možete postaviti željeni tekst za vrlo kratko vreme
  }
}

export function calculateTimeAgo1(parsedDateTime: Date): string {
  const now = new Date();
  const timeDifferenceInMilliseconds = now.getTime() - parsedDateTime.getTime();
  const minutesAgo = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
  const hoursAgo = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
  const daysAgo = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));

  if (daysAgo <= 7) {
    if (daysAgo > 0) {
      return `${daysAgo}d.`;
    }
    
    if (hoursAgo > 0) {
      return `${hoursAgo}h.`;
    }
    
    if (minutesAgo > 0) {
      if (minutesAgo < 60) {
        return `${minutesAgo}min.`;
      } else {
        return `${Math.floor(minutesAgo / 60)}h.`;
      }
    }
    
    return "Recent"; // Vrlo kratko vreme
  } else {
    // Dug prikaz za datume starije od 7 dana
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    const formattedDate = parsedDateTime.toLocaleDateString('en-US', options);
    return formattedDate;
  }
}

export function formatDate(dateString: string): string {
  const parsedDate = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(parsedDate);
  
  return formattedDate;
}

export function convertImageToBase64(image: File): string {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          return reader.result;
        }
      };
      reader.readAsDataURL(image);
    }
    return '';
}

export function sortPostsByDate(posts: Posts): Posts {
  const sortedPosts = [...posts.posts]; // Stvaranje kopije niza postova

  sortedPosts.sort((postA: Post, postB: Post) => {
    const dateA = new Date(postA.dateAndTime); // Pretvaranje datuma iz stringa natrag u Date objekt
    const dateB = new Date(postB.dateAndTime);
    
    return dateA.getTime() - dateB.getTime(); // Sortiranje po vremenu
  });

  return new Posts(sortedPosts); // Vraćanje sortiranih postova u novom objektu tipa Posts
}