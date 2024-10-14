export function slugToName(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function nameToSlug(name: string) {
  return name.toLowerCase().split(" ").join("-")
}
