import { Button, Group, Modal } from "@mantine/core";

interface BuyModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const BuyModal: React.FC<BuyModalProps> = ({ opened, onClose, onConfirm }) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Confirm Purchase" centered>
      <p>Are you sure you want to buy this product?</p>
      <Group className="mt-8 flex justify-end">
        <Button className="bg-[#D3455B] hover:bg-[#D8374F]" onClick={onClose}>
          No
        </Button>
        <Button className="bg-[#6558F5] hover:bg-[#4D3DD9]" onClick={onConfirm}>
          Yes
        </Button>
      </Group>
    </Modal>
  );
};

export default BuyModal;
