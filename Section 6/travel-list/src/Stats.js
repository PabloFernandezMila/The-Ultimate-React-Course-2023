export default function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">Start adding some items to your packing list 🚀</p>
    );
  }
  const amountOfItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / amountOfItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything ready to go! ✈️"
          : `
          🧳 You have ${amountOfItems} items on your list, and you already packed ${packedItems} (${percentage}%)
          `}
      </em>
    </footer>
  );
}
