export const times = Array.from({ length: 48 }, (_, i) => {
  const hours = String(Math.floor(i / 2)).padStart(2, "0");
  const minutes = i % 2 === 0 ? "00" : "30";
  return {
    id: i,
    time: `${hours}:${minutes}`,
  };
});
