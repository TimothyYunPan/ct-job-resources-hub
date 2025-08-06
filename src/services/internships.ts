export const getInternships = async (page: number = 1, search: string = "", roleCategory: string = "") => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (search.trim()) {
    params.append("search", search);
  }
  if (roleCategory && roleCategory !== "all") {
    params.append("roleCategory", roleCategory);
  }

  const response = await fetch(`/api/internships/list?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch internships");
  }
  return response.json();
}; 