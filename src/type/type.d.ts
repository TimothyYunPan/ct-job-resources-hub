interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

interface Internship {
  _id: string;
  company: string;
  role: string;
  location: string;
  application_url: string;
  date_posted: string;
  source: string;
  scraped_at: string;
}
