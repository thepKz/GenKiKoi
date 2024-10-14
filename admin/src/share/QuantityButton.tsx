import { Button } from "antd";
import { AddSquare, MinusSquare } from "iconsax-react";

interface Props {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantityButton = (props: Props) => {
  const { quantity, onQuantityChange } = props;
  
  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="grid w-fit grid-cols-[1fr_minmax(12px,20px)_1fr] items-center gap-1">
      <Button
        size="middle"
        type="text"
        icon={<MinusSquare size="20" />}
        onClick={handleDecrease}
      />
      <span className="text-center text-lg">{quantity}</span>
      <Button
        size="middle"
        type="text"
        icon={<AddSquare size="20" />}
        onClick={handleIncrease}
      />
    </div>
  );
};

export default QuantityButton;
