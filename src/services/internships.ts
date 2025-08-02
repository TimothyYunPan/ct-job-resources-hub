export const getInternships = async (page: number = 1) => {
  const response = await fetch(`/api/internships/list?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch internships");
  }
  return response.json();
}; 