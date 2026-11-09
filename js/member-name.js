/** Community members are shown publicly as "First name – School" (no full names). */
export function memberDisplayName(member) {
  const first = (member.firstName || member.name.trim().split(/\s+/)[0]).trim();
  return `${first} – ${String(member.institution).trim()}`;
}
