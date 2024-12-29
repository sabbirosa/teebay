import { Button, Group, Modal } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";

interface RentModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: (rentTimeFrom: Date, rentTimeTo: Date) => void;
}

const RentModal: React.FC<RentModalProps> = ({
  opened,
  onClose,
  onConfirm,
}) => {
  const [rentTimeFrom, setRentTimeFrom] = useState<Date | null>(null);
  const [rentTimeTo, setRentTimeTo] = useState<Date | null>(null);

  const handleConfirm = () => {
    if (!rentTimeFrom || !rentTimeTo) {
      alert("Please fill out both rent dates!");
      return;
    }
    onConfirm(rentTimeFrom, rentTimeTo);
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Rent Period" centered>
      <div className="flex flex-row gap-4 justify-evenly align-center">
        <DatePickerInput
          label="Rent From"
          placeholder="Pick a date"
          value={rentTimeFrom}
          onChange={setRentTimeFrom}
          className="w-1/2"
        />
        <DatePickerInput
          label="Rent To"
          placeholder="Pick a date"
          value={rentTimeTo}
          onChange={setRentTimeTo}
          className="w-1/2"
        />
      </div>
      <Group className="mt-8 flex justify-end">
        <Button className="bg-[#D3455B] hover:bg-[#D8374F]" onClick={onClose}>
          Go Back
        </Button>
        <Button
          className="bg-[#6558F5] hover:bg-[#4D3DD9]"
          onClick={handleConfirm}
        >
          Confirm Rent
        </Button>
      </Group>
    </Modal>
  );
};

export default RentModal;
