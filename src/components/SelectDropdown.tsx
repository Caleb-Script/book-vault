import { Box, Text } from '@chakra-ui/react';
import { NativeSelectField, NativeSelectRoot } from './ui/native-select';

interface SelectDropdownProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  name,
  options,
  value,
  onChange,
}) => {
  return (
    <Box mb={4}>
      <Text mb={2}>{label}</Text>
      <NativeSelectRoot size="sm" width="240px">
        <NativeSelectField
          placeholder="Select option"
          name={name}
          value={value}
          onChange={onChange}
          bg="gray.700"
          color="white"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </NativeSelectField>
      </NativeSelectRoot>
    </Box>
  );
};

export default SelectDropdown;
