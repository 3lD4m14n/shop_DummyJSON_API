interface ItemProps {
  title: string;
  quantity: number;
  price: number;
  index: number;
  updateQuantity: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
}

export default function Item({
  title,
  quantity,
  price,
  index,
  updateQuantity,
}: ItemProps) {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateQuantity(event, index);
  };

  return (
    <tr className=" group">
      <td className=" text-center border-2 border-zinc-700 p-2 group-odd:bg-gray-300">
        {title}
      </td>
      <td className=" text-center border-2 border-zinc-700 p-2 group-odd:bg-gray-300">
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min={1}
          className=" flex justify-around text-center bg-inherit w-full"
        />
      </td>
      <td className=" text-center border-2 border-zinc-700 p-2 group-odd:bg-gray-300">
        {quantity * price}
      </td>
    </tr>
  );
}
